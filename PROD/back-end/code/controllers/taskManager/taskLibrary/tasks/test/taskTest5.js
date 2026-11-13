function tasktTest5Func() {
    console.log('Running task test 5...');
    console.log('No args');
    console.log('This task will throw an error');
    throw Error('Task test 5 error');
}

const taskTest5 = {
    name: 'taskTest5',
    action: tasktTest5Func
};

module.exports = taskTest5;