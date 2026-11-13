const { ObjectId } = require("mongodb");
const Model = require("../Model");
const User = require("../User");
const SystemNotification = require("./systemNotification/SystemNotification");
const { getUser } = require("../../controllers/ams-tools/user-controllers");

class Notification extends Model {
    static collection = 'notifications';
    static ModelClass = Notification;

    constructor(data) {
        super(Notification, data);
    }

    static async create({author, addressee, text, group, type, code, data}) {
        if(!author) {
            return {
                ok: false, 
                error: 'No author was specified'
            };
        }

        if(code && !SystemNotification.codeIsValid(code)) {
            return {
                ok: false, 
                error: `The code '${code}' is invalid`
            };
        }
    
        if(!code && !text) {
            return {
                ok: false,
                error: 'No text was provided'
            };
        }
    
        if(author !== 'system' && !group) {
            return {
                ok: false,
                error: 'No group was specified'
            };
        }

        if(author !== 'system') {
            const authorData = await User.get({_id: ObjectId(author)});
        
            if(!authorData) {
                return {
                    ok: false, 
                    error: `Author ${author} not found`
                };
            }
    
            author = {
                _id: authorData._id.toString(),
                name: authorData.profile.name,
                avatarColor: authorData.settings.profile.avatarColor
            };
    
            // if(group === 'team') {
            //     //tera que pegar o id do time já que o id do accountable irá movimentar junto as notificações caso ele mude de time
            //     author.accountables = authorData.accountables.map(accountable => accountable._id);

            //     if(author.role)
            //     author.accountables = authorData.accountables.map(accountable => ({
            //         _id: accountable._id,
            //         primary: accountable.primary
            //     }));
            // }
        }

        const result = {
            foundAddressee: [],
            notFoundAddressee: []
        };
    
        const addressees = addressee
            ? Array.isArray(addressee)
                ? addressee 
                : [addressee] 
            : null;
        
        if(addressees) {
            if(['system', 'privite'].includes(group)) {
                for(let addresseeId of addressees) {
                    if(!ObjectId.isValid(addresseeId)) {
                        result.notFoundAddressee.push(addresseeId);
                        continue;
                    }
    
                    const addressee = await User.get({_id: ObjectId(addresseeId)});
        
                    if(addressee) {
                        result.foundAddressee.push(addresseeId);
                    } else {
                        result.notFoundAddressee.push(addresseeId);
                    }
                }

                if(!result.foundAddressee.length) {
                    return {ok: false, error: 'None of the addressees were found'}
                }
            } else {
                result.foundAddressee.push(...addressees);
            }
        }

        const newNotification = new Notification({
            author,
            addressee: result.foundAddressee,
            type,
            group,
            text,
            code,
            data
        });

        return await newNotification.save();
    }

    static async getReceivedOld({userId, query = {}, pipeline = [], count = true}) {
        if(!ObjectId.isValid(userId)) {
            return {
                ok: false,
                status: 400,
                json: {message: 'Invalid user ID'}
            };
        }

        const user = await User.get({_id: ObjectId(userId)});

        if(!user) {
            return {
                ok: false,
                status: 404,
                json: {message: 'User not found'}
            };
        }

        const finalPipeline = [];

        try {
            const teamQuery = {
                group: 'team',
                $and: [
                    {$or: [
                        {'author.accountables': userId},
                        {'author._id': {$in: user.accountables.map(accountable => accountable._id)}}
                    ]},
                    {$or: [
                        {addressee: {$size: 0}},
                        {addressee: user.profile.role}
                    ]}
                ]
            };

            const match = {
                $or: [
                    {'author._id': userId},
                    {addressee: userId},
                    {group: 'global'},   
                    teamQuery
                ]
            };

            if(user.profile.role === 'analyst') {
                teamQuery.$and[0].$or.unshift(
                    {'author.accountables': {$in: user.accountables.map(accountable => accountable._id)}}
                );
            } else {
                match.$or.push(
                    {group: 'leaders', addressee: {$size: 0}},
                    {group: 'leaders', addressee: user.profile.role}
                );
            }
    
            finalPipeline.push({$match: {...match, ...query}});

            if(count) {
                const lastSeen = user.settings.notifications.lastSeen;
    
                finalPipeline.push(
                    {$addFields: {
                        new: {$cond: [
                            {$or: [
                                {$and: [{$eq: ['$group', 'global']}, {$gt: ['$date', new Date(lastSeen.global)]}]},
                                {$and: [{$eq: ['$group', 'private']}, {$gt: ['$date', new Date(lastSeen.private)]}]},
                                {$and: [{$eq: ['$group', 'system']}, {$gt: ['$date', new Date(lastSeen.system)]}]},
                                {$and: [{$eq: ['$group', 'team']}, {$gt: ['$date', new Date(lastSeen.team)]}]},
                                {$and: [{$eq: ['$group', 'leaders']}, {$gt: ['$date', new Date(lastSeen.leaders)]}]}
                            ]}, 1, 0
                        ]}
                    }},
                    {$group: {
                        _id: '$group',
                        notifications: {$addToSet: '$$ROOT'},
                        new: {$sum: '$new'}
                    }}
                );
            } else {
                finalPipeline.push({$group: {
                    _id: '$group',
                    notifications: {$addToSet: '$$ROOT'}
                }});
            }
        } catch(err) {
            return {
                ok: false,
                status: 500,
                error: err
            };
        }

        const result = await Notification.aggregate([...finalPipeline, ...pipeline]);

        result.forEach(group => {
            group.notifications.sort((next, current) => {
                const nextTime = next.date.getTime();
                const currentTime = current.date.getTime();

                if(nextTime > currentTime) return -1;
                if(nextTime < currentTime) return 1;
                return 0;
            });

            group.notifications = this.getSystemNotifications(group.notifications, user.settings.profile.language);
        });

        return {
            ok: true,
            status: 200,
            json: result
        }
    }

    static async getReceived({userId, query = {}, settings = {}}) {
        const getUserResult = await getUser(userId);
        if(!getUserResult.ok) return getUserResult;
        const user = getUserResult.user;
   
        let groupQuery = {};

        if(query.group === 'leaders') {
            if(user.profile.role === 'analyst') {
                return {
                    ok: true,
                    status: 200,
                    json: []
                };
            }

            groupQuery['author._id'] = userId;
            groupQuery.$or = [
                {group: 'leaders', addressee: {$size: 0}},
                {group: 'leaders', addressee: user.profile.role}
            ];
        }

        if(query.group === 'private' || query.group === 'system') {
            groupQuery.addressee = userId;
        }

        // if(group === 'team') {
        //     //tera que pegar o id do time já que o id do accountable irá movimentar junto as notificações caso ele mude de time
        //     if(user.profile.role === 'analyst') {
        //         teamQuery.$and[0].$or.unshift(
        //             {'author.accountables': {$in: user.accountables.map(accountable => accountable._id)}}
        //         );
        //     }


        //     query = {
        //         ...query,
        //         $and: [
        //             {$or: [
        //                 {'author.accountables': userId},
        //                 {'author._id': {$in: user.accountables.map(accountable => accountable._id)}},
        //             ]},
        //             {$or: [
        //                 {addressee: {$size: 0}},
        //                 {addressee: user.profile.role}
        //             ]}
        //         ]
        //     };
        // }

        let notifications = await Notification.getMany({...query, ...groupQuery}, settings);

        // if(query.group === 'system') {
        //     try {
        //         notifications = this.getSystemNotifications(notifications, user.settings.profile.language);
        //     } catch(err) {
        //         console.log(err);

        //         return {
        //             ok: false,
        //             status: 500,
        //             json: {message: 'Internal server error'}
        //         };
        //     }
        // }

        try {
            notifications = this.getSystemNotifications(notifications, user.settings.profile.language);
        } catch(err) {
            console.log(err);

            return {
                ok: false,
                status: 500,
                json: {message: 'Internal server error'}
            };
        }

        return {
            ok: true,
            status: 200,
            json: notifications
        };
    }

    static async getSent(userId) {
       const result = await Notification.aggregate([
            {$match: {'author._id': userId}},
            {$group: {
                _id: '$group',
                notifications: {$addToSet: '$$ROOT'}
            }}
        ]);

        return {
            ok: true,
            status: 200,
            json: result
        }
    }

    static getSystemNotifications(notifications, lang) {
        return notifications.reduce((notifications, notification) => {
            if(notification.code) {
                const {code, data} = notification;
                const systemNotification = SystemNotification.get({code, data, lang});

                if(systemNotification) {
                    delete notification.data;
                    notifications.push({...notification, ...systemNotification});
                }
            } else {
                notifications.push(notification);
            }

            return notifications;
        }, []);
    }

    setDocument(data) {
        const document = {};

        document._id = data._id;
        document.date = data.date || new Date();
        document.group = data.group;

        if(data.type) {
            document.type = data.type;
        }

        if(data.code) {
            document.code = data.code;
            document.data = data.data;
        } else {
            document.text = data.text;
        }

        if(!data.addressee) {
            document.addressee = [];
        } else if(!Array.isArray(data.addressee)) {
            document.addressee = [data.addressee];
        } else {
            document.addressee = data.addressee;
        }

        if(data.author === 'system') {
            document.author = {
                name: 'AMS Tools'
            };

            if(!data.group) document.group = 'system';
        } else {
            document.author = data.author;
        }

        this.document = document;
    }

    validation() {
        if(this.document.group === 'global' && this.document.addressee.length) {
            return {
                ok: false, 
                error: `The group type '${this.document.group}' cannot have an addressee`
            };
        }

        if(this.document.group === 'team' && !this.document.author.accountables) {
            return {
                ok: false, 
                error: `The group type '${this.document.group}' must have the author accountables`
            };
        }

        if(['system', 'privite'].includes(this.document.group)) {
            if(!this.document.addressee.length) {
                return {
                    ok: false, 
                    error: `The group type '${this.document.group}' needs at least one addressee`
                };
            }
        }

        if(this.document.code && !SystemNotification.codeIsValid(this.document.code)) {
            return {
                ok: false, 
                error: `The code '${this.document.code}' is invalid`
            };
        }

        if(!this.document.code && !this.document.text) {
            return {
                ok: false, 
                error: 'No text was provided'
            };
        }

        return {ok: true};
    }
}

module.exports = Notification;

/*
'global' -> no addressee
'leaders' -> addressee are the leaders role (array). If no value its goes to all roles except analyst
'team' -> addressees are the users who has the author as accountable. An array with roles will determinate who will receive the message, and a null addressee means to everyone.
            for notification about requests, an addressee must be specificated (accountable to receive the request and requester to receive the answer)
'system' -> addressee is a specific user
'private' -> addressee is a specific user

*/