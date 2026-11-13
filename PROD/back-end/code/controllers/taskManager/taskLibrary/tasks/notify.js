const Notification = require("../../../../model/notification/Notification")

async function action(settings = {}) {
    const result = await Notification.create(settings);
    return result;
}

const notify = {
    name: 'notify',
    action,
    allowedMultiple: true
}

module.exports = notify;