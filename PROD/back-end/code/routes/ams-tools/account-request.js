const express = require('express');
const { createRequest, getCtiApplicationOptions, getAccountableOptions, validateId, validateEmail } = require('../../apis/ams-tools/account-request');

const router = express.Router();

router.get('/validate-id', validateId);

router.get('/validate-email', validateEmail);

router.get('/cti-application-options', getCtiApplicationOptions);

router.get('/accountable-options', getAccountableOptions);

router.post('/', createRequest);

module.exports = router;