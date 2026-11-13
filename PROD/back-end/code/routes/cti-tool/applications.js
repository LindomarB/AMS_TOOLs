const applicationsRouter = require('express').Router();

const { getUser, getUserFromId } = require('../../apis/ams-tools/user');
const { getApplicationOptions, getApplications, getSupportGroupOptions } = require('../../apis/cti-tool/user-settings');
const { validateToken } = require('../../middleware/token');

applicationsRouter.get('/*', validateToken);

applicationsRouter.get('/', getUser);

applicationsRouter.get('/', getApplications);

applicationsRouter.get('/options', (req, res, next) => getUserFromId(req, res, next, req.query._id || req._id));

applicationsRouter.get('/options', getApplicationOptions);

applicationsRouter.get('/support-group/options', (req, res, next) => getUserFromId(req, res, next, req.query._id || req._id));

applicationsRouter.get('/support-group/options', getSupportGroupOptions);

applicationsRouter.patch('/*', validateToken);

module.exports = applicationsRouter;