const { addApplicationPermission } = require("../../../controllers/cti-tool/user-settings-controllers");
const Application = require("../../../model/Application");
const User = require("../../../model/User");
const bcrypt = require('bcryptjs');

async function insertBaseAdmin() {
    const createUserResult = await User.create({
        profile: {
            name: 'Dereck Rukopf Grimm', 
            email: 'dereck_grimm@crgl-thirdparty.com',
            cargillId: 'd869577',
            role: 'administrator',
        },
        password: await bcrypt.hash('d12345', 12),
    }, false);

    const applications = await Application.getMany(
        {status: {$ne: 'not supported by Wipro'}}, 
        {projection: {
            _id: 1
        }}
    );

    const ctiApplications = applications.map(application => application._id.toString());
    await addApplicationPermission(createUserResult.user, ctiApplications);
}

module.exports = insertBaseAdmin;