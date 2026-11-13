const dashboardsRouter = require('express').Router();

const { getOverview } = require('../../apis/cti-tool/dashboards/overview');
const { validateToken } = require('../../middleware/token');

dashboardsRouter.get('/*', validateToken);

dashboardsRouter.get('/overview', getOverview);

module.exports = dashboardsRouter;