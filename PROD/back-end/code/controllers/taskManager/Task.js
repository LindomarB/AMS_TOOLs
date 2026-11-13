const { ObjectId } = require('mongodb');

const database = require('../../database/Database');
const taskLibrary = require('./taskLibrary/taskLibrary');

class Task {
    static collection = 'taskSchedule';
    log = null;

    constructor(settings = {}) {
        const task = taskLibrary[settings.name];

        if(!task) {
            return {error: `Error: The task "${settings.name}" could not be found in library.`};
        }

        this.logger = settings.logger;
        this.name = task.name;
        this._id = settings._id;
        this.alias = settings.alias;
        this.args = settings.args || [];
        this.createdOn = (settings.createdOn && new Date(settings.createdOn)) || new Date();
        this.startTime = settings.startTime || task.startTime || this.createdOn.toISOString().slice(11, 23);
        this.startDate = settings.startDate || task.startDate;
        this.interval = settings.interval || task.interval || 0;
        this.repeat = settings.repeat || task.repeat || 0;
        this.runAllDelays = settings.runAllDelays || task.runAllDelays || false;
        this.timesRan = settings.timesRan || 0;
        this.allowedMultiple = task.allowedMultiple || false;

        if(this.interval && !this.repeat || this.repeat && !this.interval) {
            return {error: `The task "${this.name}${this.alias? ` (${this.alias})` : ''}" has a mismatch between interval (${this.interval}) and repeat (${this.repeat}).`};
        }
        
        if(settings.startDate && !Date.parse(this.startDate)) {
            return {error: `Error: "${this.name}${this.alias? ` (${this.alias})` : ''}" has an invalid start date (${this.startDate}).`};
        }

        if(!this.startDate) {
            let scheduleDate = new Date(`${this.createdOn.toISOString().slice(0, 10)}T${this.startTime}z`);

            if(scheduleDate.getTime() - this.createdOn.getTime() < 0) {
                scheduleDate = new Date(scheduleDate.getTime() + 86400000);
            }

            this.startDate = `${scheduleDate.toISOString().slice(0, 10)}`;
        }

        this.status = {};
        this.checkStatus();
    }

    static async get(taskId) {
        const result = await database.get(this.collection, {_id: ObjectId(taskId)});

        if(result.ok && result.data) {
            result.data = new Task(result.data);
        }

        return result;
    }

    static async getMany(query = {}) {
        const result = await database.getMany(this.collection, query);

        if(result.ok) {
            result.data = result.data.map(task => new Task(task));
        }

        return result;
    }

    checkStatus() {
        if(this.repeat) {
            this.status.finished = this.timesRan >= this.repeat;
        } else {
            this.status.finished = this.timesRan > 0;
        }

        if(this.status.finished) return;

        const scheduleDate = new Date(`${this.startDate}T${this.startTime}z`);

        if(this.timesRan) {
            this.status.lastRun = scheduleDate.getTime() + (this.interval * this.timesRan - 1);
            this.status.nextRun = this.status.lastRun + this.interval;
            this.status.timeoutToNextRun = this.status.nextRun - new Date().getTime();
            this.status.lastRun = new Date(this.status.lastRun);
            this.status.nextRun = new Date(this.status.nextRun);
        } else {
            if(this.createdOn.getTime() === scheduleDate.getTime()) {
                this.status.timeoutToNextRun = 0;
            } else {
                this.status.timeoutToNextRun = scheduleDate.getTime() - new Date().getTime();
            }
            this.status.nextRun = scheduleDate;
        }

        if(this.status.timeoutToNextRun < 0) {
            const remainingRepeats = this.repeat - this.timesRan;
            const delayedRepeats = Math.ceil((this.status.timeoutToNextRun * -1) / this.interval);
            this.status.delayedRepeats = Math.min(remainingRepeats, delayedRepeats);
        }
    }

    async run() {
        this.status.running = true;
        const result = await taskLibrary[this.name].action(...this.args);

        if(!this.status.delayedRepeats) {
            this.timesRan += 1;
        } else if(this.runAllDelays) {
            this.timesRan += 1;
            this.status.delayedRepeats -= 1;
        } else {
            this.timesRan += this.status.delayedRepeats;
            this.status.delayedRepeats = 0;
        }

        this.checkStatus();
        this.status.running = false;
        return result;
    }

    setTimeoutToRun(timeout) {
        this.status.timeoutToNextRun = timeout;
        this.status.nextRun = new Date(new Date().getTime() + timeout);
    }

    setLogger(logger) {
        this.logger = logger;
    }

    newLog(text, textType) {
        this.log = this.logger.newLog({
            id: this._id,
            type: 'task',
            process: `${this._id} - ${this.alias || this.name}`,
            text,
            textType
        });
    }

    addLog(text, type) {
        if(this.log) {
            this.log.add(text, type);
        } else {
            this.newLog(text, type);
        }
    }

    closeLog() {
        if(this.log) {
            this.log.close();
            this.log = null;
        }
    }

    async save(timesRan) {
        if(timesRan) {
            this.timesRan = timesRan;
            this.checkStatus();
        }

        const data = {...this};
        delete data.status;
        delete data.log;
        delete data.logger;

        const result = await database.save(Task.collection, data);

        if(result.ok && !this._id) {
            this._id = result.dbResponse.insertedId;
        }
        return result;
    }

    async delete() {
        return await database.delete(Task.collection, {_id: this._id});
    }
}

module.exports = Task;