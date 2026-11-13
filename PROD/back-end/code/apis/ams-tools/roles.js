const roles = require("../../data/roles");

function getRole(req, res) {
    if(req.query.role) {
        return res.json(roles[req.query.role]);
    } else {
        return res.json(roles);
    }
}

exports.getRole = getRole;