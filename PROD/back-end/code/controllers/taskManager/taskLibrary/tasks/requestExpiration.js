const Notification = require("../../../../model/notification/Notification");
const Request = require("../../../../model/request/Request");
const { getRequest } = require("../../../ams-tools/request-controllers");

async function action() {
    const log = (amount) => `${amount} requests have expired`;

    const dayMs = 86400000;
    const today = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00.000z`).getTime();
    const requests = await Request.getMany({status: 'pending'});
    let expiredRequests = 0;

    for(let requestData of requests) {
        const request = await getRequest({data: requestData});
        const requestedOn = new Date(`${request.document.meta.createdOn.toISOString().slice(0, 10)}T00:00:00.000z`).getTime();
        let remainingDays = 30 - ((today - requestedOn) / dayMs);
        let notification = null;

        if(remainingDays <= 0) {
            const result = await request.expire();

            if(!result.ok) return {
                ...result, 
                log: log(expiredRequests)
            };
    
            notification = result.notification
            expiredRequests++;
        } else if(remainingDays === 7 || remainingDays === 1) {
            notification = request.getNotification({
                type: 'expiration', 
                data: {warning: true, remainingDays}
            });
        } else {
            continue;
        }
        
        await Notification.create(notification.requester);
        await Notification.create(notification.approver);
    }
    
    return {
        ok: true, 
        log: log(expiredRequests)
    };
}

const requestExpiration = {
    name: 'requestExpiration',
    action,
    startTime: '00:00:00',
    interval: 86400000,
    repeat: Infinity,
    allowedMultiple: false,
    runAllDelays: false
};

module.exports = requestExpiration;


/*
today: 2023-05-31T00:00:00.000z

requested on 2023-05-08T00:00:00.000z -> expire in 7 days (today - 23 days)
requested on 2023-05-02T00:00:00.000z -> expire today (today - 29 day)
requested on 2023-05-01T00:00:00.000z -> expired (today - 30 days)

30 - ((new Date('2023-05-31').getTime() - new Date('2023-05-08').getTime()) / 86400000)
30 - ((new Date('2023-05-31').getTime() - new Date('2023-05-02').getTime()) / 86400000)
30 - ((new Date('2023-05-31').getTime() - new Date('2023-05-01').getTime()) / 86400000)

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