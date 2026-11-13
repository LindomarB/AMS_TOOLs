
// async function addApproversArray() {
//     const database = getDb('requests');
//     const requests = await database.find().toArray();
//     requests.forEach(async request => {
//         if(request.type === 'new account' || request.type === 'access') {
//             const approvers = [{
//                 _id: request.approver, 
//                 response: request.status === 'canceled'? 'pending' : request.status
//             }];

const User = require("./model/User");

// const User = require("./model/User");
// const CTISupportGroupRequest = require("./model/request/CTISupportGroupAccessRequest");
// const Request = require("./model/request/Request");

//             if(request.status !== 'pending' && request.status !== 'canceled') {
//                 approvers[0].responsedOn = new Date(request.meta.approvedOn || request.meta.canceledOn || request.meta.refusedOn);
//             }

//             request.approvers = approvers;
//         } else {
//             const approvers = [
//                 {
//                     _id: request.approver, 
//                     response: request.approverResponse
//                 },
//                 {
//                     _id: request.additionalApprover, 
//                     response: request.additionalApproverResponse
//                 }
//             ];

//             if(request.approverResponse !== 'pending') {
//                 approvers[0].responsedOn = request.meta.createdOn;
//             }

//             if(request.additionalApproverResponse !== 'pending') {
//                 approvers[1].responsedOn = request.meta.createdOn;
//             }

//             request.approvers = approvers;
//         }
//         console.log(request)
//         const model = new Request(request);
//         await model.save();
//     });
// }

// async function addAccountable() {
//     const database = getDb('users');
//     const users = await database.find().toArray();
//     users.forEach(async user => {
//         user.accountable = user.profile.approver
//         console.log(user)


//         const model = new User(user);
//         await model.save();
//     });
// }

// async function newAccountRequestData() {
//     const database = getDb('requests');
//     const requests = await database.find({type: 'new account'}).toArray();
//     requests.forEach(async request => {
//         request.data.accountable = request.data.profile.approver;

//         const oldAccesses = request.data.accesses;

//         const accesses = [];

//         for(let tool in oldAccesses) {
//             if(tool === 'ctiTool') accesses.push('cti tool');
//             if(tool === 'teamManager') accesses.push('team manager');
//         }

//         request.data.accesses = accesses;
//         console.log(request)


//         const model = new AccountRequest(request);
//         await model.save();
//     });
// }

// async function fixNewAccessName() {
//     const database = getDb('requests');
//     const requests = await database.find({type: 'access'}).toArray();
//     requests.forEach(async request => {
//         if(request.data.tool === 'ctiTool') request.data.tool = 'cti tool';
//         if(request.data.tool === 'teamManager') request.data.tool = 'team manager';

//         console.log(request)


//         const model = new AccessRequest(request);
//         await model.save();
//     });
// }

// async function addAccountables() {
//     const users = await User.getMany();

//     for(let userData of users) {
//         const user = new User(userData);

//         user.accountables.push(user.accountable)

//         for(let accountableId of user.highAccountables) {
//             const accountable = await User.get({_id: ObjectId(accountableId)});

//             user.accountables.push({
//                 _id: accountable._id.toString(),
//                 ...accountable.profile
//             });
//         }

//         await user.save();
//     }
// }

// async function addCTIPermissions() {
//     const user = await User.get({_id: ObjectId('63f613cd46cebac870ead4e8')});

//     const supportGroups = [
//         "JDE SSC-LA-Non JDE-EDI",
//         "JDE SSC-LA-Non JDE-IFV-CROS-EBM",
//         "JDE SSC-LA-Non JDE-TIBCO",
//         "JDE SSC-LA-Non JDE-Electronic Invoice",
//     ];

//     const applications = await Application.getMany(
//         {
//             'support group': {$in: supportGroups}
//         }, 
//         {
//             projection: {
//                 name: 1,
//                 country: 1,
//                 'support group': 1
//             }
//         }
//     );

//     const x = applications.map(application => ({
//         ...application,
//         _id: application._id.toString()
//     }));

//     // console.log(user.map(user => user.profile.name))
//     user.addCTIApplicationPermissions(...x);
// }


// async function transforUserApplications() {
//     const users = await User.getMany();

//     for(let data of users) {
//         const user = new User(data);

//         const applicationPermissions = user.getSettings('cti tool', 'applicationPermissions') || [];
//         const applications = applicationPermissions.map(app => app._id);
//         await user.setSettings('cti tool', 'applications', applications);
//     }
// }

// async function supportGroupRequests() {
//     const requests = await Request.getMany({type: 'cti support group access'});

//     for(let request of requests) {
//         const model = new CTISupportGroupRequest(request);

//         if(typeof model.document.data.supportGroup !== 'string') {
            
//             model.document.data = {
//                 supportGroup: model.document.data.supportGroup.name,
//                 applications: model.document.data.supportGroup.applications
//             }
//             console.log(model.document.data)
//             const res = await model.delete()
//             console.log(res)
//         }
//     }

// }

// exports.supportGroupRequests = supportGroupRequests;
// exports.transforUserApplications = transforUserApplications;
// exports.addCTIPermissions = addCTIPermissions;
// exports.addApproversArray = addApproversArray;
// exports.addAccountable = addAccountable;
// exports.newAccountRequestData = newAccountRequestData;
// exports.fixNewAccessName = fixNewAccessName;
// exports.getRolesFor = getRolesFor;
// exports.getRequestsFor = getRequestsFor;
// exports.addAccountables = addAccountables;
// exports.getAccountablesFor = getAccountablesFor;
// exports.createAccountRequest = createAccountRequest;

// '638df0888e57d3a6e9a54ddc'
// '638f8abfae2f5750955fe7de'
// '638f8abfae2f5750955fe7df'
// '63f613ed46cebac870ead4e9'
// '63f613cd46cebac870ead4e8'


// [   //manager 3
//     "Apps-AMS-class-supportingtechnologies",

//     //manager 1 (track de 1 - 3)
//     "Apps-AMS-class-supportingtechnologies",
//     "JDE SSC-LA-OneWorld Origination-Finance",
//     "JDE SSC-LA-OneWorld Sales-Transp-Trader",
//     "JDE SSC-LA-OneWorld CM-Pricing",
//     "JDE SSC-LA-OneWorld Prop-Manu-Proc-Tax",
//     "JDE SSC-LA-World-Functional / JDE SSC-LA-World-Technical",

//     //manager 2 (track de 4 - 5)
//     "JDE SSC-LA-Non JDE-LDE-SICRAD-TCS-RECON",
//     "JDE SSC-LA-Non JDE-Cocoa",
//     "JDE SSC-LA-Non JDE-RDS-PORTUS",
//     "JDE SSC-LA-Non JDE-EDI",
//     "JDE SSC-LA-Non JDE-IFV-CROS-EBM",
//     "JDE SSC-LA-Non JDE-TIBCO",
//     "JDE SSC-LA-Non JDE-Electronic Invoice",
// ]


// static async getManyTest(query, settings) {
//     const database = getDb('requests');

//     const pipeline = [
//         {$match: query},
//         {$set: {
//             requester: {
//                 $toObjectId: '$requester'
//             },
//             approvers: {
//                 $map: {
//                     input: '$approvers',
//                     as: 'approver',
//                     in: {
//                         $mergeObjects: [
//                             '$$approver',
//                             {_id: {
//                                 $toObjectId: '$$approver._id'
//                             }}
//                         ]
//                     }
//                 }
//             }
//         }},
//         {$lookup: {
//             from: 'users',
//             localField: 'requester',
//             foreignField: '_id',
//             pipeline: [
//                 {$project: {
//                     name: '$profile.name',
//                     email: '$profile.email',
//                     role: '$profile.role',
//                     cargillId: '$profile.cargillId',
//                     status: 1,
//                     accountable: {$toObjectId: '$accountable'}
//                 }}
//             ],
//             as: 'requester'
//         }},
//         {$unwind: '$requester'},
//         {$lookup: {
//             from: 'users',
//             localField: 'requester.accountable',
//             foreignField: '_id',
//             pipeline: [
//                 {$project: {
//                     name: '$profile.name',
//                     email: '$profile.email',
//                     role: '$profile.role'
//                 }}
//             ],
//             as: 'requester.accountable'
//         }},
//         {$unwind: '$requester.accountable'},
//         {$lookup: {
//             from: 'users',
//             localField: 'approvers._id',
//             foreignField: '_id',
//             pipeline: [
//                 {$project: {
//                     name: '$profile.name',
//                     email: '$profile.email',
//                     role: '$profile.role'
//                 }}
//             ],
//             as: 'approversInfo'
//         }},
//         {$set: {
//             approvers: {
//                 $map: {
//                     input: '$approvers',
//                     as: 'approver',
//                     in: {
//                         $let: {
//                             vars: {
//                                 approver: '$$approver',
//                                 approverInfo: {
//                                     $arrayElemAt: [
//                                         {
//                                             $filter: {
//                                                 input: '$approversInfo',
//                                                 as: 'approverInfo',
//                                                 cond: {$eq: ['$$approverInfo._id', '$$approver._id']}
//                                             }
//                                         }, 0
//                                     ]
//                                 }
//                             },
//                             in: {
//                                 $mergeObjects: ['$$approver', '$$approverInfo']
//                             }
//                         }
//                     }
//                 }
//             }
//         }},
//         {$project: {
//             approversInfo: 0
//         }}
//     ];
    
//     if(settings) {
//         for(let stage in settings) {
//             pipeline.push({[`$${stage}`]: settings[stage]});
//         }
//     }

//     const requests = await database.aggregate(pipeline).
//     toArray();
//     return requests;
// }








//==========================================================================
// OLD USER QUERIES

// async function getUsers(req, res) {
//     const users = await User.getMany(
//         {...req.query}, 
//         {
//             sort: {'profile.name': 1}, 
//             ...req.querySettings
//         }
//     );

//     // const database = getDb('users');
//     // const query = {...req.query};

//     // const pipeline = [
//     //     {$match: query},
//     //     {$set: {
//     //         accountable: {
//     //             $toObjectId: '$accountable'
//     //         },
//     //         'settings.cti tool.applicationPermissions': {
//     //             $map: {
//     //                 input: '$settings.cti tool.applicationPermissions',
//     //                 as: 'application',
//     //                 in: {
//     //                     $toObjectId: '$$application'
//     //                 }
//     //             }
//     //         }
//     //     }},
//     //     {$lookup: {
//     //         from: 'users',
//     //         localField: 'accountable',
//     //         foreignField: '_id',
//     //         as: 'accountable'
//     //     }},
//     //     {$lookup: {
//     //         from: 'applications',
//     //         localField: 'settings.cti tool.applicationPermissions',
//     //         foreignField: '_id',
//     //         as: 'settings.cti tool.applicationPermissions'
//     //     }},
//     //     {$unwind: '$accountable'},
//     //     {$project: {
//     //         _id: 1,
//     //         profile: 1,
//     //         settings: 1,
//     //         accesses: 1,
//     //         status: 1,
//     //         meta: 1,
//     //         accountable: {
//     //             _id: '$accountable._id',
//     //             name: '$accountable.profile.name',
//     //             email: '$accountable.profile.email',
//     //             role: '$accountable.profile.role'
//     //         },
//     //         settings: {
//     //             'cti tool': {
//     //                 applicationPermissions: {
//     //                     $map: {
//     //                         input: '$settings.cti tool.applicationPermissions',
//     //                         as: 'application',
//     //                         in: {
//     //                             _id: '$$application._id',
//     //                             name: '$$application.name',
//     //                             supportGroup: '$$application.supportGroup'
//     //                         }
//     //                     }
//     //                 }
//     //             },
//     //             awayMode: 1
//     //         }
//     //     }},
//     //     {$sort: req.querySettings.sort || {'profile.name': 1}}
//     // ];

//     // if(req.querySettings.projection) {
//     //     pipeline.push({$project: req.querySettings.projection});
//     // }

//     // const users = await database.aggregate(pipeline).toArray();

//     return res.json(users);
// }

// // async function getTeamMembers(req, res) {
// //     const database = getDb('users');
// //     const query = {...req.query};

// //     const pipeline = [
// //         {$match: query},
// //         {$set: {
// //             accountable: {
// //                 $toObjectId: '$accountable'
// //             },
// //             'settings.cti tool.applicationPermissions': {
// //                 $map: {
// //                     input: '$settings.cti tool.applicationPermissions',
// //                     as: 'application',
// //                     in: {
// //                         $toObjectId: '$$application'
// //                     }
// //                 }
// //             }
// //         }},
// //         {$lookup: {
// //             from: 'users',
// //             localField: 'accountable',
// //             foreignField: '_id',
// //             as: 'accountable'
// //         }},
// //         {$lookup: {
// //             from: 'applications',
// //             localField: 'settings.cti tool.applicationPermissions',
// //             foreignField: '_id',
// //             as: 'settings.cti tool.applicationPermissions'
// //         }},
// //         {$unwind: '$accountable'},
// //         {$project: {
// //             _id: 1,
// //             profile: 1,
// //             settings: 1,
// //             accesses: 1,
// //             status: 1,
// //             meta: 1,
// //             accountable: {
// //                 _id: '$accountable._id',
// //                 name: '$accountable.profile.name',
// //                 email: '$accountable.profile.email',
// //                 role: '$accountable.profile.role'
// //             },
// //             settings: {
// //                 'cti tool': {
// //                     applicationPermissions: {
// //                         $map: {
// //                             input: '$settings.cti tool.applicationPermissions',
// //                             as: 'application',
// //                             in: {
// //                                 _id: '$$application._id',
// //                                 name: '$$application.name',
// //                                 supportGroup: '$$application.support group'
// //                             }
// //                         }
// //                     }
// //                 }
// //             }
// //         }},
// //         {$sort: req.querySettings.sort || {'profile.name': 1}}
// //     ];

// //     if(req.querySettings.projection) {
// //         pipeline.push({$project: req.querySettings.projection});
// //     }

// //     const members = await database.aggregate(pipeline).toArray();

// //     return res.json(members);
// // }

// async function getFilters2(req, res) {
//     // console.log(req.query)
//     // console.log(req.querySettings)
//     if(!req.querySettings.filters) return res.json([]);

//     const filters = req.querySettings.filters.reduce((filters, filter) => {
//         filters[filter.name] = {$addToSet: `$${filter.field}`}
//         return filters;
//     }, {});
//     // console.log(filters)
//     const database = getDb('users');
//     const result = await database.aggregate([
//         {$match: req.query},
//         {$unwind: '$accesses'},
//         // {$set: {
//         //     accountable: {
//         //         $toObjectId: '$accountable'
//         //     },
//         //     'settings.cti tool.applicationPermissions': {
//         //         $map: {
//         //             input: '$settings.cti tool.applicationPermissions',
//         //             as: 'application',
//         //             in: {
//         //                 $toObjectId: '$$application'
//         //             }
//         //         }
//         //     }
//         // }},
//         // {$lookup: {
//         //     from: 'users',
//         //     localField: 'accountable',
//         //     foreignField: '_id',
//         //     as: 'accountable'
//         // }},
//         // {$unwind: '$accountable'},
//         // {$lookup: {
//         //     from: 'applications',
//         //     localField: 'settings.cti tool.applications',
//         //     foreignField: '_id',
//         //     as: 'settings.cti tool.applications'
//         // }},
//         {$project: {
//             // profile: 1,
//             // settings: 1,
//             // accesses: 1,
//             // status: 1,
//             // accountable: 1,
//             // settings: 1,
//             highAccountable: 0,
//             password: 0,
//             meta: 0
//             // accountable: {
//             //     _id: '$accountable._id',
//             //     name: '$accountable.profile.name',
//             //     cargillId: '$accountable.profile.cargillId'
//             // },
//             // settings: {
//             //     'cti tool': {
//             //         applicationPermissions: {
//             //             $map: {
//             //                 input: '$settings.cti tool.applicationPermissions',
//             //                 as: 'application',
//             //                 in: {
//             //                     _id: {$toObjectId: '$$application._id'},
//             //                     name: '$$application.name',
//             //                     supportGroup: '$$application.supportGroup'
//             //                 }
//             //             }
//             //         }
//             //     }
//             // }
//         }},
//         {$unwind: '$settings.cti tool.applications'},
//         {$group: {
//             _id: null,
//             ...filters
//         }},
//         {$project: {
//             _id: 0
//         }}
//     ]).toArray();

//     return res.json(result[0] || []);
// }

// async function x() {
//     const users = await User.getMany({}, null, true);

//     for(let user of users) {
//         let primaryAccountables = await user.getPrimaryAccountables();
//         primaryAccountables = primaryAccountables.map(accountable => accountable._id)
        
//         user.accountables.forEach(accountable => {
//             if(primaryAccountables.includes(accountable._id)) {
//                 accountable.primary = true;
//             }
//         });

//         await user.save();
//         // console.log('=============================================')
//         // console.log(user.profile.name)
//         // console.log(user.accountables)
//     }
// }

// exports.x = x;