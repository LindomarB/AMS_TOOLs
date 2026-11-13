const { getPatchs } = require('../../controllers/ams-tools/patch-controllers');
const { validateToken } = require('../../middleware/token');

const patchsRouter = require('express').Router();

patchsRouter.get('/*', validateToken);

patchsRouter.get('/', getPatchs);

module.exports = patchsRouter;