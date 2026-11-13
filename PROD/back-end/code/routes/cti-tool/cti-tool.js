const ctiToolRouter = require('express').Router();

const applicationsRouter = require('./applications');
const dashboardsRouter = require('./dashboards');
const resolutionsRouter = require('./resolutions');
const tiersRouter = require('./tiers');

ctiToolRouter.use('/resolutions', resolutionsRouter);

ctiToolRouter.use('/applications', applicationsRouter);

ctiToolRouter.use('/tiers', tiersRouter);

ctiToolRouter.use('/dashboards', dashboardsRouter);

module.exports = ctiToolRouter;