const configurationRouter = require('express').Router();
const bodyParser = require('body-parser');
const headersSettings = require('../middleware/headersSettings');
const queryParser = require('../middleware/queryParser');
const { readToken } = require('../middleware/token');

configurationRouter.use(bodyParser.json({limit: '10mb'}));

configurationRouter.use(headersSettings);

configurationRouter.use(readToken);

configurationRouter.use(queryParser);

module.exports = configurationRouter;