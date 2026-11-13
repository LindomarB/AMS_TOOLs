const Notification = require("../../../model/notification/Notification");


async function insertNotifications() {
    const notifications = [
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     type: 'important', 
        //     group: 'global', 
        //     text: 'This is an important global notification. All must read.'
        // },
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     group: 'leaders', 
        //     text: 'This is a message for track leaders and managers',
        //     addressee: ['track leader', 'manager']
        // },
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     group: 'leaders', 
        //     text: 'This is a message for track leaders',
        //     addressee: ['track leader'],
        // },
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     group: 'leaders', 
        //     text: 'This is a message for managers',
        //     addressee: ['manager'],
        // },
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     group: 'team', 
        //     text: 'This is a message for my track leader team',
        //     addressee: ['track leader'],
        // },
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     group: 'team', 
        //     text: 'This is a message for my analyst team',
        //     addressee: ['analyst'],
        // },
        // {
        //     author: '638df0878e57d3a6e9a54ddb',  
        //     group: 'private', 
        //     text: 'This is a private message for you Track Leader',
        //     addressee: ['638df0888e57d3a6e9a54ddc'],
        // },
        // {
        //     author: '638df0888e57d3a6e9a54ddc',   
        //     group: 'global', 
        //     text: 'This is a global notification. All must read.'
        // },
        // {
        //     author: '638df0888e57d3a6e9a54ddc',  
        //     type: 'alert',
        //     group: 'team', 
        //     text: 'This is a message for my team'
        // },
        // {
        //     author: '63ef971eee32e3ddf25eaa0c',  
        //     type: 'alert',
        //     group: 'team', 
        //     text: 'This is a message from analyst to the team'
        // },
        // {
        //     author: '638df0888e57d3a6e9a54ddc',  
        //     type: 'alert',
        //     group: 'private', 
        //     text: 'This is a message for Analyst 1',
        //     addressee: '63ef971eee32e3ddf25eaa0c'
        // },
        // {
        //     author: '638df0888e57d3a6e9a54ddc',  
        //     type: 'alert',
        //     group: 'private', 
        //     text: 'This is a message for Analyst 2',
        //     addressee: '63e3edcf629f57a745641fba'
        // },
        // {
        //     author: '638df0888e57d3a6e9a54ddc',  
        //     group: 'private', 
        //     text: 'This is a message for Analyst 1 and Analyst 2',
        //     addressee: ['63ef971eee32e3ddf25eaa0c', '63e3edcf629f57a745641fba']
        // },
        // {
        //     author: '638df0888e57d3a6e9a54ddc',  
        //     group: 'private', 
        //     text: 'This is a private message for you Analyst 1',
        //     addressee: ['63ef971eee32e3ddf25eaa0c'],
        // },
        // {
        //     author: 'system',  
        //     type: 'update', 
        //     group: 'global', 
        //     text: 'This is a global update inform'
        // },
        // {
        //     author: 'system',  
        //     group: 'leaders', 
        //     text: 'This is a message for track leaders and managers',
        //     addressee: ['track leader', 'manager']
        // },
        // {
        //     author: 'system',  
        //     group: 'leaders', 
        //     text: 'This is a message for track leaders',
        //     addressee: ['track leader']
        // },
        // {
        //     author: 'system',  
        //     type: 'important', 
        //     text: 'This is an important message from the system',
        //     addressee: '63ef971eee32e3ddf25eaa0c'
        // },
        // {
        //     author: 'system',  
        //     type: 'alert', 
        //     text: 'Your request will expire on 03/31/2023',
        //     addressee: ['63ef971eee32e3ddf25eaa0c', '638df0888e57d3a6e9a54ddc']
        // },
        // {
        //     author: 'system',  
        //     type: 'request', 
        //     text: 'Analyst 1 is requesting something',
        //     addressee: '638df0888e57d3a6e9a54ddc'
        // },
        // {
        //     author: 'system',  
        //     type: 'canceled', 
        //     text: 'Analyst 1 canceled your request',
        //     addressee: '638df0888e57d3a6e9a54ddc'
        // },
        // {
        //     author: 'system',  
        //     type: 'expired', 
        //     text: 'The request X was expired',
        //     addressee: ['63ef971eee32e3ddf25eaa0c', '638df0888e57d3a6e9a54ddc']
        // },
        // {
        //     author: 'system',  
        //     type: 'approved', 
        //     text: 'Your request was approved',
        //     addressee: '63ef971eee32e3ddf25eaa0c'
        // },
        // {
        //     author: 'system',  
        //     type: 'refused', 
        //     text: 'Your request was refused',
        //     addressee: '63ef971eee32e3ddf25eaa0c'
        // },
        // {
        //     author: '63ef971eee32e3ddf25eaa0c',  
        //     group: 'team',
        //     type: 'away', 
        //     text: 'I\'m going to fish. Do not disturb me.'
        // },
        // {
        //     author: 'system',  
        //     code: 'ams tools-patch release', 
        //     group: 'global', 
        //     data: {
        //         version: '1.2.1'
        //     }
        // },
        {
            author: 'system',  
            code: 'ams tools-maintenance', 
            group: 'global', 
            data: {
                date: '05/17/2025',
                start: '05/17/2025 - 07:00 am (BRT)',
                end: '05/17/2025  - 11:00 am (BRT)'
            }
        },
    ];

    notifications.forEach(async notification => {
        const newNotification = await Notification.create(notification);
        
        if(!newNotification.ok) {
            console.log(notification);
            console.log(newNotification);
        }
    });
}

module.exports = insertNotifications;