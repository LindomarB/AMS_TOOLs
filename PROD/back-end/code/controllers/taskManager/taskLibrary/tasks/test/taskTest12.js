function tasktTest12Func() {
    console.log('Running task test 12...');
    console.log('No args');
    console.log('This task asks to run all delays');
    return {ok: true};
}

const taskTest12 = {
    name: 'taskTest12',
    alias: 'Task that must run all delays',
    action: tasktTest12Func,
    allowedMultiple: false,
    repeat: 10,
    interval: 2000,
    runAllDelays: true
};

module.exports = taskTest12;