const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const roles = require('../data/roles');
const passwordValidation = require('../functions/passwordValidation');
const randomColor = require('../functions/randomColor');
const database = require('../database/Database');

class User {
    static collection = 'users';

    constructor(data) {
        this._id = data._id,
        this.profile = {
            name: data.profile.name,
            email: data.profile.email,
            cargillId: data.profile.cargillId,
            role: data.profile.role
        };

        if(data.profile.role === 'administrator') {
            this.accountables = [];
        } else {
            this.accountables = data.accountables || [];
        }

        this.password= data.password;
        this.status = data.status || 'active';
        this.meta = data.meta || {
            createdOn: new Date()
        };  
        this.tasks = data.tasks || {};
        this.accesses = data.accesses || [...roles[data.profile.role].defaultAccesses];
        this.settings = data.settings || {};

        const alerts = data.settings && data.settings.alerts || {};
        const notificationsSettings = data.settings && data.settings.notifications || {};
        const profileSettings = data.settings && data.settings.profile || {};

        this.settings = {
            ...data.settings || {},
            alerts,
            notifications: {
                lastSeen: notificationsSettings.lastSeen || {}
            },
            profile: {
                avatarColor: profileSettings.avatarColor,
                language: profileSettings.language || 'en'
            }
        };
    }

    static async create(data, save = true) {
        const getAccountables = async (accountables) => {
            const newAccountables = [];

            for(let accountable of accountables) {
                const user = await User.get({_id: ObjectId(accountable._id)});

                user.accountables.forEach(userAccountable => {
                    if(!accountables.some(accountable => accountable._id === userAccountable._id)) {
                        newAccountables.push(userAccountable);
                    }
                });
            }

            return newAccountables;
        }

        if(data.settings) {
            data.settings.profile = {
                avatarColor: randomColor()
            };
        } else {
            data.settings = {
                profile: {
                    avatarColor: randomColor()
                }
            };
        }

        if(data.profile.role !== 'administrator') {
            if(!data.accountables) {
                data.accountables = [];
    
                if(data.accountable) {
                    data.accountables.push(data.accountable);
                }
            }       

            data.accountables.push(...await getAccountables(data.accountables));
        }

        const newUser = new User(data);
        await newUser.setPrimaryAccountables();

        if(save) {
            const result = await newUser.save();
    
            if(!result.ok) return result;
    
            return {
                ...result,
                user: newUser
            };
        } else {
            return {
                ok: true,
                user: newUser
            };
        }
        
    }

    static async get(query, settings, returnModel = true) {
        const result = await database.get(this.collection, query, settings);

        if(!result.ok) return null;

        if(returnModel && result.data) {
            return new User(result.data);
        } else {
            return result.data;
        }
    }

    static async getMany(query, settings, returnModel = false) {
        const result = await database.getMany(this.collection, query, settings);

        if(!result.ok) return [];

        if(returnModel) {
            return result.data.map(user => new User(user));
        } else {
            return result.data;
        }
    }

    static async aggregate(pipeline) {
        const result = await database.aggregate(this.collection, pipeline);
        return result.ok? result.data : [];
    }

    async setMeta(data) {
        for(let key in data) {
            this.meta[key] = data[key];
        }

        return await this.save();
    }

    async deleteMeta(key) {
        delete this.meta[key];
        return await this.save();
    }

    getSettings(settingName, property) {
        if(!property) {
            return this.settings[settingName];
        } else {
            return this.settings[settingName] && this.settings[settingName][property];
        }
    }

    async setSettings(settingName, property, value) {
        let setting = this.getSettings(settingName) || {};

        if(property) {
            setting[property] = value;
        } else {
            setting = value;
        }
        
        this.settings[settingName] = setting;
        return await this.save();
    }

    async removeSetting(settingName, property) {
        if(property) {
            const setting = this.getSettings(settingName) || {};
            delete setting[property];
            this.settings[settingName] = setting;
        } else {
            delete this.settings[settingName];
        }
        
        return await this.save();
    }

    async setRole(newRole, newAccountableId) {
        const newAccountable = this.get({_id: ObjectId(newAccountableId)});

        if(!newAccountable) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: 'New accountable not found'
                }
            };
        }

        if(!Object.keys(roles).includes(newRole)) {
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'The new role is invalid'
                }
            };
        }

        const accessToKeep = this.accesses.filter(access => roles[newRole].allowedAccesses.inclues(access));
        this.accesses = [...roles[newRole].defaultAccesses, ...accessToKeep];

        const result = {
            previousAccountable: this.accountable,
            newAccountable: newAccountableId,
            message: 'Role and accountable changed'
        };

        this.profile.role = newRole;
        this.accountable = {
            _id: newAccountableId,
            ...newAccountable.profile
        };

        return await this.save(result);
    }

    async setPassword(currentPassword, newPassword) {
        const currentPasswordValidation = await this.validatePassword(currentPassword);
        if(!currentPasswordValidation.ok) {
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'Invalid current password'
                }
            };
        }

        const newPasswordIsTheSame = await bcrypt.compare(newPassword, this.password);

        if(newPasswordIsTheSame) {
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'The new password must be different from the current'
                }
            };
        }

        const validationResult = passwordValidation(newPassword);

        if(!validationResult.ok) return validationResult;
      
        this.meta.passwordChanged = true;
        this.password = await bcrypt.hash(newPassword, 12);

        if(this.meta.passwordChangeOn) {
            this.meta.passwordChangeOn.push(new Date());
        } else {
            this.meta.passwordChangeOn = [new Date()];
        }

        return await this.save({message: 'Password changed'});
    }

    async requestPasswordReset() {
        if(this.getSettings('password reset')) {
            return {ok: true};
        }

        const expirationDate = new Date(new Date().getTime() + 259200000);

        const result = await this.setSettings('password reset', null, {
            requested: true, 
            date: new Date(),
            expiration: expirationDate
        });

        if(!result.ok) return result;

        const taskResult = await global.TaskManager.createTask({
            name: 'passwordResetRequestExpiration',
            alias: `Password Reset Request Expiration (user: ${this._id.toString()} - ${this.profile.name})`,
            args: [this._id.toString()],
            startDate: expirationDate.toISOString().slice(0, 10),
            startTime: expirationDate.toISOString().slice(11, 23)
        });

        if(!taskResult.ok) return taskResult;

        this.tasks.passwordResetRequest = taskResult.task._id.toString();

        return await this.save();
    }

    async cancelPasswordResetRequest() {
        await global.TaskManager.cancelTask(this.tasks.passwordResetRequest);
        delete this.tasks.passwordResetRequest;
        delete this.settings['password reset'];
        return await this.save();
    }

    async getPasswordResetAuthorization() {
        const passwordReset = this.getSettings('password reset');

        if(!passwordReset) {
            return {
                ok: false,
                status: 403,
                json: {message: 'The user did not request a password reset'}
            }
        }

        if(passwordReset.requested) {
            const cancelResult = await this.cancelPasswordResetRequest();
            if(!cancelResult.ok) return cancelResult;

            const authorization = jwt.sign(
                {user: this._id.toString()},
                'password reset',
                {expiresIn: '72h'}
            );
            
            const expirationDate = new Date(new Date().getTime() + 259200000);

            const result = await this.setSettings('password reset', null, {
                authorization, 
                date: new Date(),
                expiration: expirationDate
            });

            if(!result.ok) return result;

            const taskResult = await global.TaskManager.createTask({
                name: 'passwordResetAuthorizationExpiration',
                alias: `Password Reset Authorization Expiration (user: ${this._id.toString()} - ${this.profile.name})`,
                args: [this._id.toString()],
                startDate: expirationDate.toISOString().slice(0, 10),
                startTime: expirationDate.toISOString().slice(11, 23)
            });
    
            if(!taskResult.ok) return taskResult;
    
            this.tasks.passwordResetAuthorization = taskResult.task._id.toString();
    
            const saveResult = await this.save();
            if(!saveResult.ok) return saveResult;
        }

        return {
            ok: true,
            authorization: this.getSettings('password reset', 'authorization')
        };
    }

    async cancelPasswordResetAuthorization() {
        await global.TaskManager.cancelTask(this.tasks.passwordResetAuthorization);
        delete this.tasks.passwordResetAuthorization;
        delete this.settings['password reset'];
        return await this.save();
    }

    async resetPassword(newPassword) {
        if(!this.getSettings('password reset', 'authorization')) {
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'Password reset was not requested'
                }
            };
        }

        const validationResult = passwordValidation(newPassword);

        if(!validationResult.ok) return validationResult;
      
        this.meta.passwordChanged = true;
        this.password = await bcrypt.hash(newPassword, 12);

        if(this.meta.passwordChangeOn) {
            this.meta.passwordChangeOn.push(new Date());
        } else {
            this.meta.passwordChangeOn = [new Date()];
        }

        await this.cancelPasswordResetAuthorization();

        return await this.save({message: 'Password reseted'});
    }

    async addAccountable(accountableId) {
        if(this.isAccountable(accountableId)) {
            return {
                ok: false,
                status: 401,
                accountableAlreadyExists: true,
                json: {
                    message: `The new accountable is already a user's accountable`
                }
            };
        }

        const newAccountable = await User.get({_id: ObjectId(accountableId)}, {project: {_id: 1, profile: 1}});

        if(!newAccountable) {
            return {
                ok: false,
                status: 404,
                json: {
                    message: 'New accountable not found'
                }
            };
        }

        const oldPrimaryAccountables = this.accountables.filter(accountable => accountable.primary).map(accountable => accountable._id);

        const addedAccountables = [{
            _id: accountableId,
            ...newAccountable.profile
        }];

        this.accountables.push({
            _id: accountableId,
            ...newAccountable.profile
        });

        newAccountable.accountables.forEach(newAccountable => {
            if(!this.accountables.some(accountable => accountable._id === newAccountable._id)) {
               this.accountables.push(newAccountable);
               addedAccountables.push(newAccountable);
            }
        });

        await this.setPrimaryAccountables();

        const newPrimaryAccountables = this.accountables.filter(accountable => accountable.primary).map(accountable => accountable._id);
        const removedPrimaryAccountables = oldPrimaryAccountables.filter(accountable => !newPrimaryAccountables.includes(accountable));

        const result = await this.save();

        return {
            ...result,
            addedAccountables,
            removedPrimaryAccountables
        }
    }

    async removeAccountable(accountableId) {
        if(!this.isAccountable(accountableId)) {
            return {
                ok: false,
                status: 401,
                json: {
                    message: `The accountable is not one of user's accountable`
                }
            };
        }

        if(this.accountables.length < 2) {
            return {
                ok: false,
                status: 401,
                json: {
                    message: `The accountable is solely accountable for the user and cannot be removed`
                }
            };
        }

        const oldPrimaryAccountables = this.accountables.filter(accountable => accountable.primary).map(accountable => accountable._id);
        const oldAccountable = this.accountables.find(accountable => accountable._id === accountableId);
        this.accountables = this.accountables.filter(accountable => accountable._id !== accountableId);
        let removedAccountables = [oldAccountable];

        const secondaryAccountableRoles = roles[oldAccountable.role].accountableRoles;
        const secondaryAccountables = this.accountables.filter(accountable => secondaryAccountableRoles.includes(accountable.role));

        const primaryAccountables = await User.getMany({
            _id: {$in: this.getPrimaryAccountables().map(accountable => ObjectId(accountable._id))}
        }, null, true);

        secondaryAccountables.forEach(secondaryAccountable => {
            if(!primaryAccountables.some(primaryAccountable => primaryAccountable.isAccountable(secondaryAccountable._id))) {
                this.accountables = this.accountables.filter(accountable => accountable._id !== secondaryAccountable._id);
                removedAccountables.push(secondaryAccountable);
            }
        });

        if(!this.accountables.length) {
            this.accountables = secondaryAccountables;
            removedAccountables = [oldAccountable];
        }

        await this.setPrimaryAccountables();

        const newPrimaryAccountables = this.accountables.filter(accountable => accountable.primary).map(accountable => accountable._id);
        const addedPrimaryAccountables = newPrimaryAccountables.filter(accountable => !oldPrimaryAccountables.includes(accountable));
        
        const result = await this.save();

        return {
            ...result,
            removedAccountables,
            addedPrimaryAccountables
        }
    }

    isAccountable(accountableId) {
        return this.accountables.some(userAccountable => userAccountable._id === accountableId);
    }

    async setPrimaryAccountables(save = false) {
        const userAccountables = await User.getMany({
            _id: {$in: this.accountables.map(accountable => ObjectId(accountable._id))}
        }, null, true);

        const primaryAccountables = this.accountables.reduce((primaryAccountables, accountable) => {
            if(!userAccountables.some(userAccountable => userAccountable.isAccountable(accountable._id))) {
                primaryAccountables.push(accountable._id);
            }

            return primaryAccountables;
        }, []);

        this.accountables.forEach(accountable => {
            if(primaryAccountables.includes(accountable._id)) {
                accountable.primary = true;
            } else {
                delete accountable.primary;
            }
        });

        if(save) {
            return await this.save();
        } else {
            return this.accountables;
        }
    }

    getPrimaryAccountables() {
        return this.accountables.filter(accountable => accountable.primary);
    }

    async setTask(name, id) {
        if(!id) {
            delete this.tasks[name];
        } else {
            this.tasks[name] = id;
        }

        return await this.save();
    }

    hasAccess(access) {
        return this.accesses.includes(access);
    }

    async addAccess(access) {
        if(!roles[this.profile.role].allowedAccesses.includes(access)) {
            return {
                ok: false,
                status: 400,
                json: {
                    message: 'The access is invalid for the user'
                }
            }
        }

        if(this.accesses.includes(access)) {
            return {
                ok: false,
                status: 499,
                json: {
                    message: `The user alerady has access to ${access}`
                }
            }
        }

        this.accesses.push(access);

        return await this.save({message: 'Accesses updated'});
    }

    async removeAccess(access) {
        if(!this.accesses.includes(access)) {
            return {
                ok: false,
                status: 499,
                json: {
                    message: `The user do not has access to ${access}. No change was made.`
                }
            }
        }

        this.accesses = this.accesses.filter(userAccess => userAccess !== access);

        return await this.save({message: 'Accesses updated'});
    }

    async setStatus(newStatus) {
        this.status = newStatus;
        return await this.save({message: `Status changed to ${newStatus}`});
    }

    async activate() {
        this.status = 'active';
        delete this.meta.lockedOn;
        return await this.save({message: 'User activated'});
    }

    async lock() {
        this.status = 'locked';
        this.meta.lockedOn = new Date();
        return await this.save({message: 'User locked'});
    }

    async validatePassword(password) {
        if(password) {
            const passwordIsValid = await bcrypt.compare(password, this.password);
            if(passwordIsValid) return {ok: true};
        }

        return {
            ok: false,
            status: 403,
            json: {
                message: 'Invalid password.'
            }
        };

    }

    async login(password) {
        const passwordValidation = await this.validatePassword(password);
        if(!passwordValidation.ok) return null;

        if(this.meta.passwordChanged) {
            await database.updateOne(
                User.collection, 
                {_id: this._id}, 
                {$unset: {'meta.passwordChanged': ''}}
            );
        }

        return await this.getUserData();
    }

    // async login(password) {
    //     const passwordValidation = await this.validatePassword(password);
    //     if(!passwordValidation.ok) return null;

    //     if(this.meta.passwordChanged) {
    //         const database = getDb('users');
    //         await database.updateOne({_id: this._id}, {$unset: {'meta.passwordChanged': ''}});
    //     }

    //     return await this.getUserData();
    // }

    async setAwayMode({startDate, endDate, timezoneOffset, message, temporaryAccountable}) {
        if(this.tasks.awayMode) {
            return {
                ok: false,
                error: `The away mode is already scheduled (task ${this.tasks.awayMode})`
            };
        }

        if(!Date.parse(startDate)) {
            return {
                ok: false,
                error: `Invalid start date (${startDate})`
            };
        }
        
        if(!Date.parse(endDate)) {
            return {
                ok: false,
                error: `Invalid end date (${endDate})`
            };
        }

        const awayMode = {
            startDate: new Date(new Date(startDate).getTime() + (timezoneOffset * 60000)),
            endDate: new Date(new Date(`${endDate}T23:59:59z`).getTime() + (timezoneOffset * 60000)),
            timezoneOffset,
            message
        };

        if(awayMode.endDate.getTime() < awayMode.startDate.getTime()) {
            return {
                ok: false,
                error: `The end date cannot be earlier than the start date (start: ${startDate} - end: ${endDate})`
            };
        }

        if(this.profile.role !== 'analyst') {
            if(temporaryAccountable) {
                const tempAccountable = await User.get({_id: ObjectId(temporaryAccountable)});
    
                if(!tempAccountable) {
                    return {
                        ok: false,
                        error: `Temporary accountable not found (${temporaryAccountable})`
                    };
                }

                awayMode.temporaryAccountable = {
                    _id: temporaryAccountable, 
                    ...tempAccountable.profile
                };
            } else {
                awayMode.temporaryAccountable = {...this.accountable};
            }
        }

        this.settings.awayMode = awayMode;

        const taskResult = await global.TaskManager.createTask({
            name: 'enableAwayMode',
            alias: `Enable Away Mode (user: ${this._id.toString()} - ${this.profile.name})`,
            args: [this._id.toString()],
            startDate: awayMode.startDate.toISOString().slice(0, 10),
            startTime: awayMode.startDate.toISOString().slice(11, 23)
        });

        if(!taskResult.ok) return taskResult;

        this.tasks.awayMode = taskResult.task._id.toString();

        return await this.save({message: 'Away mode activated'});
    }

    async enableAwayMode() {
        const awayMode = this.settings.awayMode;

        if(this.status === 'away') {
            return {
                ok: true,
                warn: 'Away mode is already active'
            };
        }

        if(!awayMode) {
            return {
                ok: false,
                error: 'Away mode has not been set'
            };
        }

        if(awayMode.startDate.getTime() > new Date().getTime()) {
            return {
                ok: false,
                error: `The away mode was set to start on ${new Date(awayMode.startDate).toLocaleDateString()} and not earlier`
            };
        }

        if(!awayMode.endDate) {
            return {
                ok: false,
                error: `End date must be set before activating the away mode`
            };
        }

        this.status = 'away';

        const taskResult = await global.TaskManager.createTask({
            name: 'disableAwayMode',
            alias: `Disable Away Mode (user: ${this._id.toString()} - ${this.profile.name})`,
            args: [this._id.toString()],
            startDate: awayMode.endDate.toISOString().slice(0, 10),
            startTime: awayMode.endDate.toISOString().slice(11, 23)
        });

        if(!taskResult.ok) return taskResult;

        this.tasks.awayMode = taskResult.task._id.toString();

        return await this.save({message: 'Away mode activated'});
    }

    async disableAwayMode() {
        if(!this.settings.awayMode) {
            return {
                ok: false,
                error: 'The away mode is not set'
            };
        }

        this.status = 'active';
        await global.TaskManager.cancelTask(this.tasks.awayMode);
        delete this.tasks.awayMode;
        delete this.settings.awayMode;
        return await this.save({message: 'Away mode deactivated'});
    }

    async updateLastSeenNotifications(notifications) {
        for(let group in notifications) {
            this.settings.notifications.lastSeen[group] = new Date(notifications[group]);
        }

        return await this.save({message: 'User updated'});
    }

    async getUserData() {
        const data = {
            _id: this._id,
            profile: this.profile,
            settings: this.settings,
            accesses: this.accesses,
            notifications: this.notifications,
            meta: this.meta,
            status: this.status,
            accountables: this.accountables
        };

        return data;
    }

    async save(json) {
        const result = await database.save(
            User.collection, 
            this, 
            {
                okMessage: true,
                errorMessage: true
            }
        );

        if(!result.ok) return result;

        return {
            ...result,
            json: {
                ...result.json || {},
                ...json || {}
            }
        };
    }

    // async insert() {
    //     try {
    //         const database = getDb('users');
    //         const result = await database.insertOne(this);

    //         return {
    //             ok: true, 
    //             status: 200,
    //             newUserId: result.insertedId
    //         };
    //     } catch(error) {
    //         console.log(error)
    //         return {
    //             ok: false,
    //             status: 500,
    //             json: {
    //                 message: 'User not created (error during model inserting)',
    //                 error
    //             }
    //         };
    //     }
    // }

    // async save(json) {
    //     if(!this._id) return await this.insert();

    //     try {
    //         const database = getDb('users');
    //         await database.updateOne({_id: this._id}, {$set: this});

    //         return {
    //             ok: true, 
    //             status: 200,
    //             json: json || {}
    //         };
    //     } catch(error) {
    //         return {
    //             ok: false,
    //             status: 500,
    //             json: {
    //                 message: 'Changes could not be saved (error during model saving)',
    //                 error
    //             }
    //         };
    //     }
    // }
}

module.exports = User;