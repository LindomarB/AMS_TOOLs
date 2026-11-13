function tasktTest6Func() {
    console.log('Running task test 6...');
    console.log('No args');
    console.log('This task will allow multiple');
    return {ok: true};
}

const taskTest6 = {
    name: 'taskTest6',
    action: tasktTest6Func,
    allowedMultiple: true
};

module.exports = taskTest6;