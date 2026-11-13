const Patch = require("../../model/Patch");

async function getPatchs(req, res) {
    const result = await Patch.getMany(req.query, req.querySettings);
    return res.json(result);
}

exports.getPatchs = getPatchs;