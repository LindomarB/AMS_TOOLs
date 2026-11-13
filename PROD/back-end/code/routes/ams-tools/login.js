const express = require('express');
const { logIn, requestPasswordReset, verifyPasswordReset, confirmPasswordReset } = require('../../apis/ams-tools/login');

const router = express.Router();

router.post('/', logIn);

router.post('/password-reset/request', requestPasswordReset);

router.post('/password-reset/verify', verifyPasswordReset);

router.post('/password-reset/confirm', confirmPasswordReset);

module.exports = router;