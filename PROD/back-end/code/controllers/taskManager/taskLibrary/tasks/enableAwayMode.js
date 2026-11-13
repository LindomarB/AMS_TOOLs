const { ObjectId } = require("mongodb");
const User = require("../../../../model/User");
const Notification = require("../../../../model/notification/Notification");

async function action(userId) {
    const user = await User.get({_id: ObjectId(userId)});

    if(!user) {
        return {
            ok: false,
            error: `The user ${userId} was not found`
        }
    }

    const activeResult = await user.enableAwayMode();

    if(!activeResult.ok) {
        return {
            ...activeResult,
            error: `Away mode could not be activated: ${activeResult.error}`
        };
    }

    const awayMode = {...user.settings.awayMode};
    const notification = {
        author: userId,
        group: 'team'
    };

    if(awayMode.message) {
        notification.type = 'away';
        notification.text = awayMode.message;
    } else {
        delete awayMode.message;
        notification.code = 'user-away mode-active';
        notification.data = awayMode;
    }
    
    const createNotification = await Notification.create(notification);

    if(!createNotification.ok) {
        return {
            ...createNotification,
            error: `Unable to create notification: ${createNotification.error}`
        };
    }

    return {ok: true}
}

const enableAwayMode = {
    name: 'enableAwayMode',
    action,
    allowedMultiple: true
}

module.exports = enableAwayMode;