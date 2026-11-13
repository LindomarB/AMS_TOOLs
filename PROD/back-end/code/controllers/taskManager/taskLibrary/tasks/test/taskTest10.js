function tasktTest10Func() {
    console.log('Running task test 10...');
    console.log('No args');
    console.log('This task will repeat infinitely with an interval of 5 seconds');
    return {ok: true};
}

const taskTest10 = {
    name: 'taskTest10',
    action: tasktTest10Func,
    allowedMultiple: false,
    repeat: Infinity,
    interval: 5000,
    runAllDelays: false
};

module.exports = taskTest10;