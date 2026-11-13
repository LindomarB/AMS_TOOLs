function tasktTest1Func(arg1, arg2) {
    console.log('Running task test 1...');
    console.log('Number args', arg1, arg2);
    console.log('Result: ', arg1 + arg2);
    return {ok: true};
}

const taskTest1 = {
    name: 'taskTest1',
    alias: 'Task Test 1',
    action: tasktTest1Func,
    allowMultiple: true
};

module.exports = taskTest1;