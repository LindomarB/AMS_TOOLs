const { getUser } = require('../../apis/ams-tools/user');
const { getFaq, getUserGuide, newMessage } = require('../../apis/support/support');
const createFileUploader = require('../../middleware/fileUpload');

const bugReportFileUploader = createFileUploader({
    field: 'images',
    accept: ['jpg', 'jpeg', 'png', 'svg'],
    destination: 'uploads/support'
});

const supportRouter = require('express').Router();

supportRouter.get('/', getFaq);

supportRouter.get('/user-guide', getUserGuide);

supportRouter.post('/*', getUser);

supportRouter.post('/message', bugReportFileUploader, newMessage);

module.exports = supportRouter;