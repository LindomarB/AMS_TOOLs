const amsToolsNotifications = require("./notifications/ams-tools-notifications");
const ctiToolNotifications = require("./notifications/cti-tool-notifications");
const requestNotifications = require("./notifications/request-notifications");
const teamManagerNotifications = require("./notifications/team-manager-notifications");
const userNotifications = require("./notifications/user-notifications");

class SystemNotification {
    static notifications = {
        ...amsToolsNotifications,
        ...ctiToolNotifications,
        ...requestNotifications,
        ...userNotifications,
        ...teamManagerNotifications
    };

    static get({code, data = {}, lang = 'eng'}) {
        if(!code || !this.notifications[code]) return null;

        const notification = this.notifications[code](data, lang);
        notification.text = notification.text[lang];

        if(notification.title) {
            notification.title = notification.title[lang];
        }
        
        return notification;
    }

    static getUTCDate(date, timezoneOffset) {
        return new Date(date.getTime() - ((timezoneOffset - new Date().getTimezoneOffset()) * 60000));
    }

    static codeIsValid(code) {
        return !!this.notifications[code];
    }
}

module.exports = SystemNotification;

/*
from 05/05/2023 to 05/12/2023
Date is in UTC - 2023-05-05T03:00:00.000z to 2023-05-13T02:59:00.000z

Preciso colocar uma data em UTC que para o servidor seja igual a data com o timezone

data UTC - (timezone da data - timezone do servidor)
2023-05-13T02:59:00.000z - (180 - 240) -> 2023-05-13T03:59:00.000z (+ 1h)
2023-05-13T02:59:00.000z - (180 - 180) -> 2023-05-13T02:59:00.000z (  0h)
2023-05-13T02:59:00.000z - (180 - 120) -> 2023-05-13T01:59:00.000z (- 1h)
2023-05-13T02:59:00.000z - (180 - 060) -> 2023-05-13T00:59:00.000z (- 2h)
2023-05-13T02:59:00.000z - (180 - 000) -> 2023-05-12T23:59:00.000z (- 3h)
2023-05-13T02:59:00.000z - (180 - -60) -> 2023-05-12T23:59:00.000z (- 4h)

*/