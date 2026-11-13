const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');

class Logger {
    constructor({folderPath, fileName, add}) {
        this.folderPath = folderPath || path.join(__dirname, 'logger');
        this.fileName = `${fileName || 'log'}.txt`;
        this.filePath = path.join(this.folderPath, fileName);
        this.openLogsPath = path.join(this.folderPath, 'open logs');

        this.#checkFolder();
        const dash = '='.repeat(50);
        fs.appendFileSync(this.filePath, `\n${dash} Log Started ${dash}\n\n`);
        if(add) this.add(add);
        this.#autoRecovery();
    }

    static getHeader({type, process, timestamp}) {
        return `[${timestamp || new Date().toLocaleString()}] [${type? type.toUpperCase() : 'INFO'}] ${process}`;
    }

    #autoRecovery() {
        if(!fs.existsSync(this.openLogsPath)) return;

        const openLogs = fs.readdirSync(this.openLogsPath);

        if(!openLogs.length) return;

        this.add({
            type: 'warn',
            process: 'Logger.autoRecovery',
            text: [
                'The program was terminated while some logs were being recorded',
                `${openLogs.length} logs were recovered \n`
            ]
        });

        this.#write('---------- Auto Recovery Start ----------\n');

        openLogs.forEach(fileName => {
            const log = new Log({
                recovery: true,
                id: fileName.replace('.txt', ''),
                folderPath: this.openLogsPath, 
                logger: this
            });

            log.add('Auto recovery - The program was terminated before this log was finished', 'warn');
            log.close();
        });

        this.#write('---------- Auto Recovery End ----------\n\n');
    }

    #checkFolder() {
        if(!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath, {recursive: true});
        }
    }

    #write(text) {
        this.#checkFolder();
        fs.appendFileSync(this.filePath, text);
    }

    newLog(log) {
        if(!log.process) return null;
        return new Log({
            ...log, 
            folderPath: this.openLogsPath, 
            logger: this
        });
    }

    startBatchLog(log) {
        if(this.batchLog) {
            this.batchLog.add(log.text, log.textType);
        } else {
            this.batchLog = this.newLog(log);
        }
    }

    endBatchLog() {
        if(this.batchLog) {
            this.closingBatch = true;
            this.batchLog.close();
            this.batchLog = null;
            this.closingBatch = false;
        }
    }

    add({type, process, text, print}) {
        if(this.batchLog) {
            this.batchLog.add(`${process? `${process} - ` : ''}${text}`, type);
            return;
        }

        this.#checkFolder();

        let log = Logger.getHeader({type, process});

        if(Array.isArray(text)) {
            log = log + `\n${text.map(string => `\t${string}`).join('\n')}\n`
        } else {
            log = log + ` - ${text}\n`
        }

        fs.appendFileSync(this.filePath, log);

        if(print) console.log(log);
    }

    addLog(log) {
        if(!this.closingBatch && this.batchLog) {
            this.batchLog.addLog(log);
        } else {
            fs.appendFileSync(this.filePath, log);
        }
    }
}

class Log {
    constructor({id, type, process, text, textType, folderPath, logger, recovery}) {
        this.process = process;
        this.folderPath = folderPath;
        this.id = recovery? id : this.#createId(this.folderPath, id);
        this.filePath = path.join(folderPath, `${this.id}.txt`);
        this.logger = logger;

        if(!recovery) {
            this.#checkFolderPath();
            fs.writeFileSync(this.filePath, `${Logger.getHeader({type, process})}\n${text? this.#newLine(text, textType) : ''}`);
        }
    }

    #createId(folderPath, id) {
        id = id || ObjectId().toString();

        while(true) {
            if(fs.existsSync(path.join(folderPath, `${id}.txt`))) {
                id = ObjectId().toString();
            } else {
                break;
            }
        }

        return id;
    }

    #checkFolderPath() {
        if(!fs.existsSync(this.folderPath)) fs.mkdirSync(this.folderPath, {recursive: true});
    }

    #checkFile() {
        let fileExists = true;

        if(!fs.existsSync(this.filePath)) {
            fileExists = false;
        } else {
            const log = fs.readFileSync(this.filePath, 'utf8');

            if(!log) {
                fileExists = false;
            }
        }

        if(!fileExists) {
            const text = 'This file was deleted and recreated automatically. Previous entries have been lost.';
            fs.writeFileSync(this.filePath, `${Logger.getHeader({type, process: this.process})}\n${this.#newLine(text, 'warn')}`);
        }
    }

    #newLine(text, type = 'info') {
        const timestamp = `[${new Date().toLocaleString()}]`;

        if(Array.isArray(text)) {
            const process = text.shift();
            text = `${process}\n${text.map(string => `\t\t${string}`).join('\n')}`
        }

        return `\t>> ${timestamp}${type? ` [${type.toUpperCase()}] ` : ' '}${text}\n`;
    }

    add(text, type = 'info') {
        this.#checkFolderPath();
        this.#checkFile();
        fs.appendFileSync(this.filePath, this.#newLine(text, type));
    }

    addLog(log) {
        this.#checkFolderPath();
        this.#checkFile();

        log = log.split('\n');
        if(!log[log.length - 1]) log.pop();
        log[0] = `>> ${log[0]}`;
        log = log.map(string => `\t${string}`).join('\n');
        log = log + '\n';

        fs.appendFileSync(this.filePath, log);
    }

    close() {
        if(fs.existsSync(this.filePath)) {
            let log = fs.readFileSync(this.filePath, 'utf8');
            this.logger.addLog(log);
            fs.unlinkSync(this.filePath);
        } else {
            throw new Error(`Error when closing the log '${id}'. The log do not exists.`);
        }
    }
}

module.exports = Logger;