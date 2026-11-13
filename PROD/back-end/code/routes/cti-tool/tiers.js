const tiersRouter = require('express').Router();

const { getTiersTree, getTiersStatus, exportTiers } = require('../../apis/cti-tool/tiers');
const { validateToken } = require('../../middleware/token');

tiersRouter.get('/*', validateToken);

tiersRouter.get('/', getTiersTree);

tiersRouter.get('/status', getTiersStatus);

tiersRouter.get('/export', exportTiers);

module.exports = tiersRouter;