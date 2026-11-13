function tasktTest4Func() {
    console.log('Running task test 4...');
    console.log('No args');
    console.log('This task will run but fail');
    return {ok: false, error: 'Task 4 executed and return ok = false', log: 'This is a log from Task 4'};
}

const taskTest4 = {
    name: 'taskTest4',
    action: tasktTest4Func
};

module.exports = taskTest4;