const { getRole } = require('../../apis/ams-tools/roles');

const rolesRouter = require('express').Router();

rolesRouter.get('/', getRole);

module.exports = rolesRouter;