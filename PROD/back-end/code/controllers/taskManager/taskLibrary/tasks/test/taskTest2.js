function tasktTest2Func(arg1, arg2) {
    console.log('Running task test 2...');
    console.log('String args', arg1, arg2);
    console.log('Result: ', arg1, arg2);
    return {ok: true};
}

const taskTest2 = {
    name: 'taskTest2',
    action: tasktTest2Func
};

module.exports = taskTest2;