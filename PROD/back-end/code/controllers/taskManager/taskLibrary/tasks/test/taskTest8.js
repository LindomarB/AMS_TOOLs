function tasktTest8Func() {
    console.log('Running task test 8...');
    console.log('No args');
    console.log('This task will repeat 5 times with an interval of 5 seconds');
    return {ok: true};
}

const taskTest8 = {
    name: 'taskTest8',
    action: tasktTest8Func,
    allowedMultiple: false,
    repeat: 5,
    interval: 5000
};

module.exports = taskTest8;