const fs = require('fs');
const path = require('path');

class ErrorHandler {
    constructor({taskManager, folderPath}) {
        this.taskManager = taskManager;
        this.folderPath = folderPath;
        this.errorLogPath = path.join(folderPath, 'error log.txt');
        this.runningErrosPath = path.join(folderPath, 'running errors.txt');
        this.timer = null;
        this.running = false;
    }

    #readFile(path) {
        if(!fs.existsSync(path)) return [];

        let file = fs.readFileSync(path, 'utf8');

        if(!file) return [];

        try {
            file = JSON.parse(file);
        } catch(err) {
            try {
                file = JSON.parse(`[${file}]`);
            } catch(err) {
                this.taskManager.logger.add({
                    process: 'ErrorHandler',
                    type: 'error',
                    text: [`Couldn't parse the file ${path}`, err]
                });

                return [];
            }
        }

        return file;    
    }

    #setTimer() {
        this.timer = setTimeout(this.handleErrors, 60000);
    }

    start = async () => {
        this.taskManager.logger.add({
            process: 'ErrorHandler.start',
            text: 'Starting...'
        });
        if(!fs.existsSync(this.folderPath)) fs.mkdirSync(this.folderPath, {recursive: true});

        if(fs.existsSync(this.runningErrosPath)) {
            const runningErrors = this.#readFile(this.runningErrosPath);

            runningErrors.forEach((error, index) => {
                fs.appendFileSync(
                    this.errorLogPath, 
                    `${JSON.stringify(error)}${index === runningErrors.length - 1? '' : ', '}`
                );
            });

            fs.unlinkSync(this.runningErrosPath);
        }

        await this.handleErrors();

        const taskWithErrors = [];

        if(fs.existsSync(this.errorLogPath)) {
            const errorLog = this.#readFile(this.errorLogPath);
    
            errorLog.forEach(error => {
                if(['scheduleTask', 'updateTask', 'endTask'].includes(error.method)) {
                    taskWithErrors.push(error.args[0]);
                }
            });
        }

        this.#setTimer();
        this.taskManager.logger.add({
            process: 'ErrorHandler.start',
            text: 'Initialization completed'
        });

        return taskWithErrors;
    }

    stop = () => {
        clearTimeout(this.timer);
        this.taskManager.logger.add({
            process: 'ErrorHandler.stop',
            text: 'Stoped'
        });
    }

    newError = ({method, args = [], error, task}) => {
        let newError = {method, args, error, timestamp: new Date().toLocaleString()};
        let coma = fs.existsSync(this.errorLogPath);
        
        fs.appendFileSync(this.errorLogPath, `${coma? ', ' : ''}${JSON.stringify(newError)}`);

        this.taskManager.logger.add({
            type: 'error',
            process: `TaskManager.${method}${task? ` - ${task.alias || task.name} (${task._id.toString()})` : ''}`,
            text: [
                'An error occurred during execution:',
                ...Array.isArray(error)? error : [error],
                'A new attempt will be made.'
            ]
        });
    }

    handleErrors = async () => {
        if(!fs.existsSync(this.errorLogPath)) {
            this.#setTimer();
            return;
        };

        fs.copyFileSync(this.errorLogPath, this.runningErrosPath);
        fs.unlinkSync(this.errorLogPath, '');

        const errors = this.#readFile(this.runningErrosPath);
        // try {
        //     errors = JSON.parse(`[${fs.readFileSync(this.runningErrosPath, 'utf8')}]`);
        // } catch(err) {
        //     this.taskManager.logger.add({
        //         process: 'ErrorHandler',
        //         type: 'error',
        //         text: [`Couldn't parse error log file`, err]
        //     });
        //     this.#setTimer();
        //     return;
        // }

        fs.writeFileSync(this.runningErrosPath, JSON.stringify(errors));

        while(errors.length) {
            const error = errors.pop();

            this.taskManager.logger.add({
                process: 'ErrorHandler',
                text: `Trying to execute TaskManager.${error.method} (failed on ${error.timestamp})`
            });

            await this.taskManager[error.method](...error.args);
            fs.writeFileSync(this.runningErrosPath, JSON.stringify(errors));
        }

        this.#setTimer();
        fs.unlinkSync(this.runningErrosPath);
    }    
}

module.exports = ErrorHandler;