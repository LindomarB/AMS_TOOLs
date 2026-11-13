const apiRouter = require('express').Router();

const configurationRouter = require('../configuration');
const loginRouter = require('../ams-tools/login');
const requestRouter = require('../ams-tools/request');
const accountRequestRouter = require('../ams-tools/account-request');
const userRouter = require('../ams-tools/user');
const notificationRouter = require('../ams-tools/notification');
const patchsRouter = require('../ams-tools/patchs');
const applicationCatalogRouter = require('../application-catalog/application-catalog');
const ctiToolRouter = require('../cti-tool/cti-tool');
const rolesRouter = require('../ams-tools/roles');
const teamManagerRouter = require('../team-manager/team-manager');
const supportRouter = require('../support/support');

apiRouter.use(configurationRouter);
apiRouter.use('/log-in', loginRouter);
apiRouter.use('/account-request', accountRequestRouter);
apiRouter.use('/requests', requestRouter);
apiRouter.use('/patchs', patchsRouter);
apiRouter.use('/roles', rolesRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/notifications', notificationRouter);
apiRouter.use('/application-catalog', applicationCatalogRouter);
apiRouter.use('/cti-tool', ctiToolRouter);
apiRouter.use('/team-manager', teamManagerRouter);
apiRouter.use('/support', supportRouter);

module.exports = apiRouter;