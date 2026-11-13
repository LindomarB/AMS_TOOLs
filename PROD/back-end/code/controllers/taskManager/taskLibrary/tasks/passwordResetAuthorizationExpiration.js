const { ObjectId } = require("mongodb");
const User = require("../../../../model/User");

async function action(userId) {
    const user = await User.get({_id: ObjectId(userId)});

    if(!user) {
        return {
            ok: false,
            error: `The user ${userId} was not found`
        }
    }

    return await user.cancelPasswordResetAuthorization();
}

const passwordResetAuthorizationExpiration = {
    name: 'passwordResetAuthorizationExpiration',
    action,
    allowedMultiple: true,
    runAllDelays: true
};

module.exports = passwordResetAuthorizationExpiration;