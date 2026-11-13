import modules from "../../../../data/app/modules";

const getNotificationPath = (notification) => {
    const code = notification? notification.code.split('-') : [];
    let path = null;

    if(code[0] === 'request') {
        if(code[1] === 'new' || code[1] === 'cancel') {
            path = modules('team manager', 'team requests').path;
        } else if (code[1] === 'response' || code[1] === 'requester') {
            path = modules('account settings').getRoute('requests').path;
        } 
    } else {
        if(code[0] === 'ams tools') {
            if(code[1] === 'tool') {
                path = modules('account settings').getRoute('account', 'tools').path;
            } else if(code[1] === 'patch release') {
                path = modules('support', 'release notes').path;
            }
        } else if(code[0] === 'cti tool') {
            switch(code[1]) {
                case 'application permission':
                    path = modules('account settings').getRoute('cti tool', 'applications').path;
                    break;
                case 'support group access':
                    path = modules('account settings').getRoute('cti tool', 'support groups').path;
                    break;
                case 'resolution':
                    path = modules('cti tool', 'create resolution').path;
                    break;
                default:
                    path = null;
            }
        } else if(code[0] === 'team manager') {
            switch(code[1]) {
                case 'member':
                    path = modules('account settings').getRoute('account', 'accountables').path;
                    break;
                case 'accountable':
                    path = modules('team manager', 'manage team').path;
                    break;
                default:
                    path = null;
            }
        } else if(code[0] === 'user') {
            switch(code[1]) {
                case 'password reset':
                    if(code[2] === 'request') {
                        path = `${modules('team manager', 'manage team').path}/${notification.user}/account/reset-password`;
                    }
                    break;
                default:
                    path = null;
            }
        }
    }

    return path;
}

export default getNotificationPath;