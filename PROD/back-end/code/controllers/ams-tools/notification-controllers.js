const Notification = require("../../model/notification/Notification");

async function newNotification(req, res) {
    const result = await Notification.create({
        ...req.body,
        author: req._id
    });

    res.status(result.status);
    return res.json(result.json);
}

async function getNotifications(req, res) {
    const result = await Notification.sentTo(req._id.toString());
    res.status(result.status);
    return res.json(result.json);
}

exports.newNotification = newNotification;
exports.getNotifications = getNotifications;