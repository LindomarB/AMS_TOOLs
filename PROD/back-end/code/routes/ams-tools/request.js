const router = require('express').Router();

const { getRequests, getFilters, newRequest, updateRequest } = require('../../apis/ams-tools/request');
const { getUser, getUserFromId } = require('../../apis/ams-tools/user');
const { validateToken } = require('../../middleware/token');

router.get('/*', validateToken);

router.get('/', getRequests);

router.get('/filters', getFilters);

router.post('/*', validateToken);

router.post('/', (req, res, next) => getUserFromId(req, res, next, req.body.requester));

router.post('/', newRequest);

router.patch('/*', validateToken);

router.patch('/', updateRequest);

module.exports = router;