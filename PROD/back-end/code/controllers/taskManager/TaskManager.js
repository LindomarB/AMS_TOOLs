const path = require('path');

const ErrorHandler = require('./ErrorHandler');
const Task = require('./Task');
const Logger = require('../../library/logger/Logger');

class TaskManager {
    schedule = {};

    async getTask(taskId, method) {
        const result = {
            ok: true,
            newTask: false
        };

        result.task = this.schedule[taskId] && this.schedule[taskId].task;

        if(!result.task) {
            const getResult = await Task.get(taskId);

            if(!getResult.ok) {
                result.ok = false;

                this.errorHandler.newError({
                    method, 
                    args: [taskId], 
                    error: [`Could not search for task ${taskId} in database`, result.error]
                });
            } else if(!getResult.data) {
                result.ok = false;

                this.logger.add({
                    type: 'error',
                    process: `TaskManager.${method}`,
                    text: `The task "${taskId}" could not be found`
                });
            } else {
                result.task = getResult.data;
                result.task.setLogger(this.logger);
                result.newTask = true;
            }
        }

        return result;
    }

    async createTask(settings) {
        const task = new Task({...settings, logger: this.logger});

        if(task.error) {
            this.logger.add({
                type: 'error',
                process: 'TaskManager.createTask',
                text: task.error,
                print: true
            });

            return {
                ok: false,
                error: task.error
            };
        }

        if(!task.allowedMultiple) {
            for(let id in this.schedule) {
                const scheduledTask = this.schedule[id].task;
                if(scheduledTask.name === task.name) {
                    const text = [
                        `Cannot create the task "${settings.alias || settings.name}"`,
                        `The task ${settings.name} not allow multiple schedules`,
                        `Current scheduled task: ${scheduledTask.alias || scheduledTask.name} (${id})`
                    ];

                    this.logger.add({
                        type: 'error',
                        process: 'TaskManager.createTask',
                        text,
                        print: true
                    });

                    return {
                        ok: false,
                        error: `The task ${settings.name} not allow multiple schedules`
                    };
                }
            }
        }

        if(settings._id) {
            const result = Task.get({_id: settings._id});

            if(result.data) {
                const error = `The ID ${settings._id} is already in use`;
                
                this.logger.add({
                    type: 'error',
                    process: 'TaskManager.createTask',
                    text: error
                });

                return {
                    ok: false,
                    error
                };
            }
        }

        const result = await task.save();

        if(!result.ok) {
            this.errorHandler.newError({
                method: 'createTask', 
                args: [settings], 
                error: result.error,
                task
            });
        } else {
            await this.scheduleTask(task._id.toString());
        }

        return {
            ok: true,
            task
        };
    }

    async scheduleTask(taskId, timeout) {
        if(!taskId) {
            this.logger.add({
                type: 'error',
                process: 'TaskManager.scheduleTask',
                text: `No ID was provided`
            });

            return;
        }

        const {task, newTask} = await this.getTask(taskId, 'scheduleTask');
        if(!task) return;

        if(task.status.finished) {
            this.schedule[task._id.toString()] = {task};
            this.endTask(taskId);
            return;
        }

        if(timeout) {
            task.setTimeoutToRun(timeout);
        } else if(task.status.delayedRepeats) {
            task.setTimeoutToRun(1000);
        }

        const id = task._id.toString();

        if(newTask) {
            this.logger.add({
                process: 'TaskManager.scheduleTask',
                text: `Task "${task.alias || task.name} (${id})" scheduled to ${task.status.nextRun.toLocaleString()}`
            });
        } else {
           task.addLog(`Rescheduled to ${task.status.nextRun.toLocaleString()}`);
           task.closeLog();
        }

        this.schedule[id] = {
            task,
            timer: setTimeout(() => this.runTask(id), timeout || task.status.timeoutToNextRun)
        };
    }

    async runTask(taskId) {
        const {task} = await this.getTask(taskId, 'runTask');
        if(!task) return;

        if(!task.log) {
            task.newLog(`Started${task.status.delayedRepeats? ' (delayed)' : ''}`);
        } else {
            task.log.add(`Started${task.status.delayedRepeats? ' (delayed)' : ''}`);
        }

        if(!this.schedule[taskId.toString()]) {
            this.schedule[taskId.toString()] = {task};
        }

        try {
            const result = await task.run();
            if(result.error) task.addLog(result.error, 'fail');
            task.addLog(`Finished${result.log? ` - ${result.log}` : ''}`);
            await this.updateTask(taskId);
        } catch (error) {
            task.addLog(`${error} (new attempt in 1 minute)`, 'error');
            await this.scheduleTask(taskId, 60000);
            task.closeLog();
        }
    }

    async updateTask(taskId, timesRan) {
        const {task} = await this.getTask(taskId, 'updateTask');
        if(!task) return;

        if(!this.schedule[taskId.toString()]) {
            this.schedule[taskId.toString()] = {task};
        }

        const result = await task.save(timesRan);

        if(!result.ok) {
            task.addLog('Failed to update task', 'error');
            task.closeLog();

            this.errorHandler.newError({
                method: 'updateTask', 
                args: [taskId, task.timesRan], 
                error: result.error,
                task
            });

            return;
        }

        if(task.status.delayedRepeats) {
            await this.runTask(taskId);
        } else if(task.status.finished) {
            await this.endTask(taskId);
        } else {
            await this.scheduleTask(taskId);
        }
    }

    async endTask(taskId) {
        const {task} = await this.getTask(taskId, 'endTask');
        if(!task) return;

        try {
            const result = await task.delete();
            if(!result.ok) throw new Error(result.error);

            task.addLog('Terminated');
            task.closeLog();
            delete this.schedule[taskId];
        } catch(error) {
            task.addLog('Failed to terminate task', 'error');
            task.closeLog();

            this.errorHandler.newError({
                method: 'endTask', 
                args: [taskId], 
                error: result.error,
                task
            });
        }
    }

    async cancelTask(taskId) {
        const {task} = await this.getTask(taskId, 'cancelTask');
        if(!task) return;

        try {
            if(task.status.running) throw new Error(`The task ${task.alias || task.name} (${taskId}) is running and cannot be canceled`);

            clearTimeout(task.timer);
            const result = await task.delete();

            if(!result.ok) throw new Error(result.error);

            this.logger.add({
                process: 'TaskManager.cancel',
                text: `The task "${task.alias || task.name} (${taskId})" was canceled`
            });

            delete this.schedule[taskId];
        } catch(error) {
            this.errorHandler.newError({
                method: 'cancelTask', 
                args: [taskId], 
                error: error,
                task
            });
        }
    }

    async start(tasks = []) {
        this.logger = new Logger({
            folderPath: path.join(__dirname, 'logs', 'task schedule'),
            fileName: `task schedule log ${process.env.NODE_ENV}.txt`
        });
        
        this.logger.startBatchLog({
            process: 'TaskManager.start',
            text: 'Starting...'
        });
        
        this.errorHandler = new ErrorHandler({
            taskManager: this, 
            folderPath: path.join(__dirname, 'logs', 'errors')
        });

        const tasksWithError = await this.errorHandler.start();
        const result = await Task.getMany();

        if(!result.ok) {
            this.errorHandler.stop();
            setTimeout(() => this.start(tasks), 5000);
            this.logger.add({
                type: 'warn',
                text: 'Unable to load the scheduled tasks (new attempt in 5 seconds)'
            });
            this.logger.add({
                type: 'error',
                text: result.error
            });
            this.logger.endBatchLog();
            return;
        }

        this.logger.add({text: 'Initialization completed'});
        this.logger.endBatchLog();

        const tasksToLoad = result.data.filter(task => {
            if(task.error) {
                this.logger.add({
                    type: 'error',
                    text: task.error
                });
                
                return false;
            }

            const taskId = task._id.toString();
            return !this.schedule[taskId] && !tasksWithError.includes(taskId);
        });

        for(let task of tasksToLoad) {
            await this.scheduleTask(task._id.toString());
        }

        const scheduledTasks = Object.values(this.schedule).map(scheduleTask => scheduleTask.task);

        for(let task of tasks) {
            const taskName = `${task.name}${task.alias || ''}`;

            if(!scheduledTasks.some(scheduledTask => `${scheduledTask.name}${scheduledTask.alias || ''}` === taskName)) {
                await this.createTask(task);
            }
        }
    }
}

module.exports = TaskManager;