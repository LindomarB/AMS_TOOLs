const router = require('express').Router();

const { getUser, getUserFromId, updateUserApplications, updateUserAccess, getAccountableOptions, updatePassword, getUsers, updateStatus, setAwayMode, getFilters, updateLastSeenNotifications, getNotifications, unsetAwayMode, getNotificationsOld, getToolOptions } = require('../../apis/ams-tools/user');
const { validateToken } = require('../../middleware/token');

router.get('/*', validateToken);

router.get('/', getUsers);

router.get('/filters', getFilters);

router.get('/notifications', getNotifications);

router.get('/notificationsOld', getNotificationsOld);

router.get('/accountables/options', getUser);

router.get('/accountables/options', getAccountableOptions);

router.get('/access/options', getToolOptions);

router.patch('/*', validateToken);

router.patch('/password', getUser);

router.patch('/password', updatePassword);

router.patch('/settings/notifications/last-seen', getUser);

router.patch('/settings/notifications/last-seen', updateLastSeenNotifications);

router.patch('/access', getUser);

router.patch('/access', updateUserAccess);

router.patch('/status', (req, res, next) => getUserFromId(req, res, next, req.body.userId));

router.patch('/status', updateStatus);

router.patch('/set-away-mode', (req, res, next) => getUserFromId(req, res, next, req.body.userId));

router.patch('/set-away-mode', setAwayMode);

router.patch('/unset-away-mode', (req, res, next) => getUserFromId(req, res, next, req.body.userId));

router.patch('/unset-away-mode', unsetAwayMode);

router.patch('/cti-tool/applications', getUser);

router.patch('/cti-tool/applications', updateUserApplications);

module.exports = router;