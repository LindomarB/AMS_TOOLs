const TaskManager = require("./controllers/taskManager/TaskManager");

function startTaskManager() {
    global.TaskManager = new TaskManager();
    global.TaskManager.start([
        {name: 'requestExpiration'},
        {name: 'resolutionInProgressExpiration'},
        // {name: 'taskTest10'},
        // {name: 'taskTest12'}
    ]);
}

module.exports = startTaskManager;