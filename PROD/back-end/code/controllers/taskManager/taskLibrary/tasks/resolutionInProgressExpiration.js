const Notification = require("../../../../model/notification/Notification");
const ResolutionInProgress = require("../../../../model/resolution/ResolutionInProgress");

async function action() {
    const log = (amount) => `${amount} resolutions in progress have been deleted`;

    const dayMs = 86400000;
    const today = new Date(`${new Date().toISOString().slice(0, 10)}T00:00:00.000z`).getTime();
    const resolutions = await ResolutionInProgress.getMany();
    let expiredResolutions = 0;

    for(let resolutionData of resolutions) {
        const resolutionInProgress = new ResolutionInProgress(resolutionData);
        const createdOn = new Date(`${resolutionInProgress.document.meta['created on'].toISOString().slice(0, 10)}T00:00:00.000z`).getTime();
        let remainingDays = 30 - ((today - createdOn) / dayMs);

        if(remainingDays <= 0) {
            const result = await resolutionInProgress.expire();

            if(!result.ok) return {
                ...result, 
                log: log(expiredResolutions)
            };
    
            expiredResolutions++;
        } else if(remainingDays !== 7 || remainingDays !== 1) {
            continue;
        }

        await Notification.create({
            author: 'system',
            addressee: resolutionInProgress.document.meta['created by']._id,
            code: `cti tool-resolution expiration${remainingDays > 0? '-warnning' : ''}`,
            data: {
                incident: resolutionInProgress.document.incident.incident,
                ...remainingDays > 0? {remainingDays} : {}
            }
        });   
    }

    return {
        ok: true, 
        log: log(expiredResolutions)
    };
}

const resolutionInProgressExpiration = {
    name: 'resolutionInProgressExpiration',
    action,
    startTime: '00:00:00',
    interval: 86400000,
    repeat: Infinity,
    allowedMultiple: false,
    runAllDelays: false
};

module.exports = resolutionInProgressExpiration;