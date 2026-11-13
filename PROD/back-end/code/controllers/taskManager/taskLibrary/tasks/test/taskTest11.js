function tasktTest11Func() {
    console.log('Running task test 11...');
    console.log('No args');
    console.log('This task will return a message to be written to the log');
    return {
        ok: true,
        log: 'This is a log from task test 11'
    };
}

const taskTest11 = {
    name: 'taskTest11',
    alias: 'Task that return a log',
    action: tasktTest11Func,
    allowedMultiple: false
};

module.exports = taskTest11;