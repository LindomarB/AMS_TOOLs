const enableAwayMode = require("./tasks/enableAwayMode");
const disableAwayMode = require("./tasks/disableAwayMode");
const notify = require("./tasks/notify");
const requestExpiration = require("./tasks/requestExpiration");
const resolutionInProgressExpiration = require("./tasks/resolutionInProgressExpiration");
const testLibrary = require("./tasks/test/testLibrary");
const passwordResetRequestExpiration = require("./tasks/passwordResetRequestExpiration");
const passwordResetAuthorizationExpiration = require("./tasks/passwordResetAuthorizationExpiration");

const taskLibrary = {
    disableAwayMode,
    enableAwayMode,
    passwordResetAuthorizationExpiration,
    passwordResetRequestExpiration,
    resolutionInProgressExpiration,
    requestExpiration,
    notify,
    ...testLibrary
};

module.exports = taskLibrary;