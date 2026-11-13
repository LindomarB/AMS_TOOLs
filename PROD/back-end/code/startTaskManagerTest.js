const TaskManager = require("./controllers/taskManager/TaskManager");

function startTaskManagerTest() {
    global.TaskManager = new TaskManager();
    global.TaskManager.start([
        // {name: 'taskTest1', args: [1, 2]},
        // {name: 'taskTest1', alias: 'Another task test 1', args: [30, 50]},
        // {name: 'taskTest2', args: ['string arg 1', 'string arg 2']},
        // {name: 'taskTest3', args: [{name: 'arg 1', array: [1, 'a'], obj: {a: 1}},{name: 'arg 2', array: [2, 'b'], obj: {b: 2}}]},
        // {name: 'taskTest4'},
        // {name: 'taskTest5'},
        // {name: 'taskTest6'},
        // {name: 'taskTest6', alias: 'Another task test 6 in 1m', startTime: new Date(new Date().getTime() + 60000).toISOString().slice(11, 23)},
        // {name: 'taskTest6', alias: 'Another task test 6 in 2m', startTime: new Date(new Date().getTime() + 120000).toISOString().slice(11, 23)},
        // {name: 'taskTest6', alias: 'Another task test 6 in 3m', startTime: new Date(new Date().getTime() + 180000).toISOString().slice(11, 23)},
        // {name: 'taskTest7'},
        // {name: 'taskTest7', alias: 'Another task test 7 in 10s', startTime: new Date(new Date().getTime() + 10000).toISOString().slice(11, 23)},
        // {name: 'taskTest7', alias: 'Another task test 7 in 20s', startTime: new Date(new Date().getTime() + 20000).toISOString().slice(11, 23)},
        // {name: 'taskTest7', alias: 'Another task test 7 in 30s', startTime: new Date(new Date().getTime() + 30000).toISOString().slice(11, 23)},
        // {name: 'taskTest8'},
        // {name: 'taskTest9'},
        // {name: 'taskTest10'},
        // {name: 'taskTest11'},
        // {name: 'taskTest12'}
    ]);
}

module.exports = startTaskManagerTest;