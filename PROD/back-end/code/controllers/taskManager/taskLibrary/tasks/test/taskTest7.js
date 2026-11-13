function tasktTest7Func() {
    console.log('Running task test 7...');
    console.log('No args');
    console.log('This task not allow multiple');
    return {ok: true};
}

const taskTest7 = {
    name: 'taskTest7',
    action: tasktTest7Func,
    allowedMultiple: false
};

module.exports = taskTest7;