function tasktTest3Func(arg1, arg2) {
    console.log('Running task test 3...');
    console.log('Object args', arg1, arg2);
    console.log('Result: ');
    console.log(arg1);
    console.log(arg2);
    return {ok: true};
}

const taskTest3 = {
    name: 'taskTest3',
    action: tasktTest3Func
};

module.exports = taskTest3;