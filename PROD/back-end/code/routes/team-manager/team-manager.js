const { getUserFromId, getUser } = require('../../apis/ams-tools/user');
const { getTeamMember, updateMemberApplications, updateMemberAccess, checkAccountable, getNewMemberOptions, addMember, removeMember, getMemberApplicationOptions, getMemberSupportGroupOptions, generatePasswordResetAuthorization } = require('../../apis/teamManager/manage-team');
const { getOrgChart } = require('../../apis/teamManager/org-chart');
const { ctiTeam, overview } = require('../../apis/teamManager/team-stats');
const { validateToken } = require('../../middleware/token');

const teamManagerRouter = require('express').Router();

teamManagerRouter.get('/*', validateToken);

teamManagerRouter.get('/team-member', (req, res, next) => getUserFromId(req, res, next, req.query._id));

teamManagerRouter.get('/team-member', getTeamMember);

// teamManagerRouter.get('/team-members', getTeamMembers);

teamManagerRouter.get('/new-member-options', getUser);

teamManagerRouter.get('/new-member-options', getNewMemberOptions);

teamManagerRouter.get('/member-application-options', getUser);

teamManagerRouter.get('/member-application-options', getMemberApplicationOptions);

teamManagerRouter.get('/member-support-group-options', getUser);

teamManagerRouter.get('/member-support-group-options', getMemberSupportGroupOptions);

teamManagerRouter.get('/stats/cti-tool', ctiTeam);

teamManagerRouter.get('/stats/overview', overview);

teamManagerRouter.get('/org-chart', getOrgChart);

teamManagerRouter.patch('/*', getUser);

teamManagerRouter.patch('/*', checkAccountable);

teamManagerRouter.patch('/member/cti-tool/applications/permissions', updateMemberApplications);

teamManagerRouter.patch('/member/access', updateMemberAccess);

teamManagerRouter.patch('/member/remove', removeMember);

teamManagerRouter.patch('/member/password-reset', generatePasswordResetAuthorization);

teamManagerRouter.post('/*', getUser);

teamManagerRouter.post('/member/add', addMember);

module.exports = teamManagerRouter;