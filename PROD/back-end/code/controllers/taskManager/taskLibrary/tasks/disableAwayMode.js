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

    return await user.disableAwayMode();
}

const disableAwayMode = {
    name: 'disableAwayMode',
    action,
    allowedMultiple: true,
}

module.exports = disableAwayMode;