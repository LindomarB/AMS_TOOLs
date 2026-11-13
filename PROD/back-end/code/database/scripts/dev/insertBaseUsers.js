const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const User = require('./model/User.js');

async function insertBaseUsers() {
    // const newDev = {
    //     _id: ObjectId('638df0878e57d3a6e9a54dd9'),
    //     profile: {
    //         name: 'Dereck Grimm', 
    //         email: 'dereck@cargill.com',
    //         cargillId: 'd869577',
    //         role: 'dev',
    //     },
    //     password: await bcrypt.hash('d12345', 12),
    //     accesses: ['cti tool', 'team manager'],
    //     settings: {
    
    //     },
    //     status: 'active'
    // };
    // awaUser.create(it newDev);
    
    const administrator = {
        _id: ObjectId('638df0878e57d3a6e9a54dda'),
        profile: {
            name: 'Administrator', 
            email: 'admin@cargill.com',
            cargillId: 'ADM000001',
            role: 'administrator'
        },
        password: await bcrypt.hash('a12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: '638df0878e57d3a6e9a54dda'.toString(),
            name: 'Administrator', 
            email: 'admin@cargill.com',
            cargillId: 'ADM000001',
            role: 'administrator'
        }
    };
    // await User.create(administrator);

    const manager = {
        _id: ObjectId('638df0878e57d3a6e9a54ddb'),
        profile: {
            name: 'Manager', 
            email: 'manager@cargill.com',
            cargillId: 'M000001',
            role: 'manager',
        },
        password: await bcrypt.hash('m12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        accountable: {
            _id: administrator._id.toString(),
            ...administrator.profile
        },
        status: 'active'
    };
    // await User.create(manager);

    const trackLeader = {
        _id: ObjectId('638df0888e57d3a6e9a54ddc'),
        "profile": {
          "name": "Track Leader",
          "email": "trackLeader@cargill.com",
          "cargillId": "T000001",
          "role": "track leader"
        },
        "password": "$2a$12$ypnba5uudahBs4oFhLZ50u8AuyyNhHXCYzAvak/ElULS.hMNCxCQq",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        accountable: {
            _id: manager._id.toString(),
            ...manager.profile
        },
        "status": "active",
        "accesses": [
          "team manager",
          "cti tool"
        ]
      };
    // await User.create(trackLeader);
    
    const analyst1 = {
        _id: ObjectId('63ef971eee32e3ddf25eaa0c'),
        "profile": {
          "name": "Analyst 1",
          "email": "a1@cargill.com",
          "cargillId": "A000001",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$yyaNSPT0Crd.5YYYMLnIn.RHWztalEdhbvvGgigePne9lo6hUSJ5y",
        "settings": {},
        "status": "active",
        "accesses": []
      };
    // await User.create(analyst1);

    const analyst2 = {
        _id: ObjectId('63e3edcf629f57a745641fba'),
        "profile": {
          "name": "Analyst 2",
          "email": "a2@cargill.com",
          "cargillId": "A000002",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$HMDU6FrO07VrYoJ8rEXgfuxLit7jPqJeBFumRooPCxEUmw9uhTDHC",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        "status": "active",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst2);

    const analyst3 = {
        _id: ObjectId('63e3ff5c8149cfa19703fe06'),
        "profile": {
          "name": "Analyst 3",
          "email": "a3@cargill.com",
          "cargillId": "A000003",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$MNbuaMTlXK9YrRd46Z0IZeUpf4z.WK4dNdf/EmdMuPWheM0G8ErCm",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        "status": "locked",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst3);

    const analyst4 = {
        _id: ObjectId('63efbd1d6a52def67c97af2b'),
        "profile": {
          "name": "Analyst 4",
          "email": "a4@cargill.com",
          "cargillId": "A000004",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$Tz3LmlyISC0BIjp8pTPAhOtZM9KfncY.2CR6DvrIjZFFYtTb4AFw2",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        "status": "active",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst4);

    const analyst5 = {
        _id: ObjectId('63efbd686a52def67c97af2e'),
        "profile": {
          "name": "Analyst 5",
          "email": "a5@cargill.com",
          "cargillId": "A000005",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$nXSAApOCCk8Oq97fTAe9jusw/r/2PP1vROQr.PVv2gyZ7RX5.vmW6",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        "status": "active",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst5);

    const analyst6 = {
        _id: ObjectId('63e5128badfed76e12785e22'),
        "profile": {
          "name": "Analyst 6",
          "email": "a6@cargill.com",
          "cargillId": "A000006",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$uQkVnQmpvFgl8YCU/azQleKsO1MqYelJfltxCGScYZI0d2HD9h.bi",
        "settings": {
          "cti tool": {
            "applications": []
          },
          "awayMode": {
            "period": {
              "from": "2023-02-21",
              "to": "2023-02-23"
            },
            "message": " ifga gbag a gasgysyegfsysegfuyseg fyisuysgefse",
            "temporaryAccountable": ""
          }
        },
        "status": "away",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst6);

    const analyst7 = {
        _id: ObjectId('63e528d0f896acf391f50aa1'),
        "profile": {
          "name": "Analyst 7",
          "email": "a7@cargill.com",
          "cargillId": "A000007",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$rW/GuTEIULk1YSTWBaF/OeQG71m9cNKcQ0wJuxPTWwuFFEadQUdtm",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        "status": "active",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst7);

    const analyst8 = {
        _id: ObjectId('63efbddf6a52def67c97af30'),
        "profile": {
          "name": "Analyst 8",
          "email": "a8@cargill.com",
          "cargillId": "A000008",
          "role": "analyst"
        },
        accountable: {
            _id: trackLeader._id.toString(),
            ...trackLeader.profile
        },
        "password": "$2a$12$Vjk8WyIvbLiZY1W1WNojU.TLvEerutvE2IECWdRtoNwVmTy/RzP4a",
        "settings": {
          "cti tool": {
            "applications": []
          }
        },
        "status": "active",
        "accesses": [
          "cti tool"
        ]
      };
    // await User.create(analyst8);
    
    const trackLeader2 = {
        _id: ObjectId('638f8abfae2f5750955fe7de'),
        profile: {
            name: 'Track Leader 2', 
            email: 'trackLeader2@cargill.com',
            cargillId: 'T000002',
            role: 'track leader',
        },
        password: await bcrypt.hash('t12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager._id.toString(),
            ...manager.profile
        },
    };
    // await User.create(trackLeader2);

    const analyst9 = {
        _id: ObjectId('63f610b346cebac870ead4e6'),
        profile: {
            name: 'Analyst 9', 
            email: 'a9@cargill.com',
            cargillId: 'A000009',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader2._id.toString(),
            ...trackLeader2.profile
        }
    };
    // await User.create(analyst9);


    const analyst10 = {
        _id: ObjectId('63f6109e46cebac870ead4e5'),
        profile: {
            name: 'Analyst 10', 
            email: 'a10@cargill.com',
            cargillId: 'A000010',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader2._id.toString(),
            ...trackLeader2.profile
        }
    };
    // await User.create(analyst10);

    const analyst11 = {
        _id: ObjectId('63f6109346cebac870ead4e4'),
        profile: {
            name: 'Analyst 11', 
            email: 'a11@cargill.com',
            cargillId: 'A000011',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader2._id.toString(),
            ...trackLeader2.profile
        }
    };
    // await User.create(analyst11);

    const trackLeader3 = {
        _id: ObjectId('638f8abfae2f5750955fe7df'),
        profile: {
            name: 'Track Leader 3', 
            email: 'trackLeader3@cargill.com',
            cargillId: 'T000003',
            role: 'track leader',
        },
        password: await bcrypt.hash('t12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager._id.toString(),
            ...manager.profile
        },
    };
    // await User.create(trackLeader3);

    const analyst12 = {
        _id: ObjectId('63f6108446cebac870ead4e3'),
        profile: {
            name: 'Analyst 12', 
            email: 'a12@cargill.com',
            cargillId: 'A000012',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader3._id.toString(),
            ...trackLeader3.profile
        }
    };
    // await User.create(analyst12);

    const analyst13 = {
        _id: ObjectId('63f6107146cebac870ead4e2'),
        profile: {
            name: 'Analyst 13', 
            email: 'a13@cargill.com',
            cargillId: 'A000013',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader3._id.toString(),
            ...trackLeader3.profile
        }
    };
    // await User.create(analyst13);

    const analyst14 = {
        _id: ObjectId('63f6106646cebac870ead4e1'),
        profile: {
            name: 'Analyst 14', 
            email: 'a14@cargill.com',
            cargillId: 'A000013',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader3._id.toString(),
            ...trackLeader3.profile
        }
    };
    await User.create(analyst14);

    const analyst15 = {
        _id: ObjectId('63f6105a46cebac870ead4e0'),
        profile: {
            name: 'Analyst 15', 
            email: 'a15@cargill.com',
            cargillId: 'A000015',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader3._id.toString(),
            ...trackLeader3.profile
        }
    };
    await User.create(analyst15);

    const analyst16 = {
        _id: ObjectId('63f6104a46cebac870ead4df'),
        profile: {
            name: 'Analyst 16', 
            email: 'a16@cargill.com',
            cargillId: 'A000016',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader3._id.toString(),
            ...trackLeader3.profile
        }
    };
    await User.create(analyst16);
    
    const analyst17 = {
        _id: ObjectId('63f6103d46cebac870ead4de'),
        profile: {
            name: 'Analyst 17', 
            email: 'a17@cargill.com',
            cargillId: 'A000017',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader3._id.toString(),
            ...trackLeader3.profile
        }
    };
    await User.create(analyst17);

    const manager2 = {
        _id: ObjectId('63f6102546cebac870ead4dd'),
        profile: {
            name: 'Manager 2', 
            email: 'manager2@cargill.com',
            cargillId: 'Ma000002',
            role: 'manager',
        },
        password: await bcrypt.hash('m12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: administrator._id.toString(),
            ...administrator.profile
        },
    };
    await User.create(manager2);

    const trackLeader4 = {
        _id: ObjectId('63f613ed46cebac870ead4e9'),
        profile: {
            name: 'Track Leader 4', 
            email: 'trackLeader4@cargill.com',
            cargillId: 'T000004',
            role: 'track leader',
        },
        password: await bcrypt.hash('t12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager2._id.toString(),
            ...manager2.profile
        }
    };
    await User.create(trackLeader4);

    const analyst18 = {
        _id: ObjectId('63f6143346cebac870ead4ea'),
        profile: {
            name: 'Analyst 18', 
            email: 'a18@cargill.com',
            cargillId: 'A000018',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader4._id.toString(),
            ...trackLeader4.profile
        }
    };
    await User.create(analyst18);

    const analyst19 = {
        _id: ObjectId('63f6144046cebac870ead4eb'),
        profile: {
            name: 'Analyst 19', 
            email: 'a19@cargill.com',
            cargillId: 'A000019',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader4._id.toString(),
            ...trackLeader4.profile
        }
    };
    await User.create(analyst19);

    const analyst20 = {
        _id: ObjectId('63f6144946cebac870ead4ec'),
        profile: {
            name: 'Analyst 20', 
            email: 'a20@cargill.com',
            cargillId: 'A000020',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader4._id.toString(),
            ...trackLeader4.profile
        }
    };
    await User.create(analyst20);

    const trackLeader5 = {
        _id: ObjectId('63f613cd46cebac870ead4e8'),
        profile: {
            name: 'Track Leader 5', 
            email: 'trackLeader5@cargill.com',
            cargillId: 'T000005',
            role: 'track leader',
        },
        password: await bcrypt.hash('t12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager2._id.toString(),
            ...manager2.profile
        }
    };
    await User.create(trackLeader5);

    const analyst21 = {
        _id: ObjectId('63f6145646cebac870ead4ed'),
        profile: {
            name: 'Analyst 21', 
            email: 'a21@cargill.com',
            cargillId: 'A000021',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader5._id.toString(),
            ...trackLeader5.profile
        }
    };
    await User.create(analyst21);

    const analyst22 = {
        _id: ObjectId('63f6146246cebac870ead4ee'),
        profile: {
            name: 'Analyst 22', 
            email: 'a22@cargill.com',
            cargillId: 'A000022',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader5._id.toString(),
            ...trackLeader5.profile
        }
    };
    await User.create(analyst22);

    const analyst23 = {
        _id: ObjectId('63f6146b46cebac870ead4ef'),
        profile: {
            name: 'Analyst 23', 
            email: 'a23@cargill.com',
            cargillId: 'A000023',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader5._id.toString(),
            ...trackLeader5.profile
        }
    };
    await User.create(analyst23);

    const analyst24 = {
        _id: ObjectId('63f6147546cebac870ead4f0'),
        profile: {
            name: 'Analyst 24', 
            email: 'a24@cargill.com',
            cargillId: 'A000024',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: trackLeader5._id.toString(),
            ...trackLeader5.profile
        }
    };
    await User.create(analyst24);

    const manager3 = {
        _id: ObjectId('63f613ae46cebac870ead4e7'),
        profile: {
            name: 'Manager 3', 
            email: 'manager3@cargill.com',
            cargillId: 'Ma000003',
            role: 'manager',
        },
        password: await bcrypt.hash('m12345', 12),
        accesses: ['cti tool', 'team manager'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: administrator._id.toString(),
            ...administrator.profile
        },
    };
    await User.create(manager3);

    const analyst25 = {
        _id: ObjectId('63f6148246cebac870ead4f1'),
        profile: {
            name: 'Analyst 25', 
            email: 'a25@cargill.com',
            cargillId: 'A000025',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager3._id.toString(),
            ...manager3.profile
        }
    };
    await User.create(analyst25);

    const analyst26 = {
        _id: ObjectId('63f6148b46cebac870ead4f2'),
        profile: {
            name: 'Analyst 26', 
            email: 'a26@cargill.com',
            cargillId: 'A000026',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager3._id.toString(),
            ...manager3.profile
        }
    };
    await User.create(analyst26);

    const analyst27 = {
        _id: ObjectId('63f6149746cebac870ead4f3'),
        profile: {
            name: 'Analyst 27', 
            email: 'a27@cargill.com',
            cargillId: 'A000027',
            role: 'analyst',
        },
        password: await bcrypt.hash('A0a0....', 12),
        accesses: ['cti tool'],
        settings: {
            'cti tool': {
                applications: []
            }
        },
        status: 'active',
        accountable: {
            _id: manager3._id.toString(),
            ...manager3.profile
        }
    };
    await User.create(analyst27);
}

module.exports = insertBaseUsers;