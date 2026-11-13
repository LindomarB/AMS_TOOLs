function tasktTest9Func() {
    console.log('Running task test 9...');
    console.log('No args');
    console.log('This task will repeat infinitely with an interval of 10 seconds');
    return {ok: true};
}

const taskTest9 = {
    name: 'taskTest9',
    action: tasktTest9Func,
    allowedMultiple: false,
    repeat: Infinity,
    interval: 10000
};

module.exports = taskTest9;