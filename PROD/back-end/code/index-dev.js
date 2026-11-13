require('dotenv').config({path: '.env.development'});
const express = require('express');
const bcrypt = require('bcryptjs');

/* ROUTES */
// const configurationRouter = require('./routes/configuration');
// const loginRouter = require('./routes/ams-tools/login');
// const requestRouter = require('./routes/ams-tools/request');
// const accountRequestRouter = require('./routes/ams-tools/account-request');
// const userRouter = require('./routes/ams-tools/user');
// const notificationRouter = require('./routes/ams-tools/notification');
// const patchsRouter = require('./routes/ams-tools/patchs');
// const applicationCatalogRouter = require('./routes/application-catalog/application-catalog');
// const ctiToolRouter = require('./routes/cti-tool/cti-tool');
// const rolesRouter = require('./routes/ams-tools/roles');
// const teamManagerRouter = require('./routes/team-manager/team-manager');
const apiRouter = require('./routes/api/api');

/* CLASSES */
const startTaskManager = require('./startTaskManager');
const database = require('./database/Database');

const app = express();

app.use('/api', apiRouter)
// app.use(configurationRouter);
// app.use('/log-in', loginRouter);
// app.use('/account-request', accountRequestRouter);
// app.use('/requests', requestRouter);
// app.use('/patchs', patchsRouter);
// app.use('/roles', rolesRouter);
// app.use('/users', userRouter);
// app.use('/notifications', notificationRouter);
// app.use('/application-catalog', applicationCatalogRouter);
// app.use('/cti-tool', ctiToolRouter);
// app.use('/team-manager', teamManagerRouter);

app.listen(process.env.PORT);

bcrypt.hash('Fernando123.', 12).then(password => console.log(password))


database.connect(
    startTaskManager,
    () => console.log('Development environment online'),
);