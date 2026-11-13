const { newNotification, getNotifications } = require('../../controllers/ams-tools/notification-controllers');
const { validateToken } = require('../../middleware/token');

const router = require('express').Router();

router.get('/', validateToken);

router.get('/', getNotifications);

router.post('/', validateToken);

router.post('/', newNotification);

module.exports = router;