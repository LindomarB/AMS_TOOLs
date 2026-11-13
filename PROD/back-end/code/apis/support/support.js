const fs = require('fs');
const faq = require("../../data/support/faq");
const path = require('path');
const SupportMessage = require('../../model/SupportMessage');

async function getFaq(req, res) {
    res.json(faq);
}

async function getUserGuide(req, res) {
    const lang = req.query.lang || 'EN';

    try {
        const dirPath = __dirname.split('\\');
        const root = dirPath.slice(0, dirPath.length - 2);
        const fileName= `AMS Tools User Guide - ${lang}.pdf`;
        const filePath = path.join(...root, 'data', 'support', fileName);
        const file = fs.createReadStream(filePath);
        file.on('error', () => {})
        const fileStats = fs.statSync(filePath);

        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        res.setHeader('Content-Length', fileStats.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        
        return file.pipe(res);
    } catch(err) {
        res.status(404);
        return res.json({message: 'The requested file was not found'});
    }
}

async function newMessage(req, res) {
    const author = req._user;
    const files = req.files && req.files.map(file => file.path);

    try {
        const message = new SupportMessage({
            ...req.body,
            files,
            meta: {
                'created by': {
                    _id: author._id.toString(),
                    name: author.profile.name,
                    cargillId: author.profile.cargillId 
                },
                'created on': new Date()
            }
        });

        const result = await message.save();

        if(!result.ok && files) {
            for(let file of files) {
                await fs.unlink(file);
            }
        }

        res.status(result.status);
        return res.json(result.json);
    } catch(err) {
        if(!result.ok && files) {
            for(let file of files) {
                await fs.unlink(file);
            }
        }

        console.log(err);
    }
    
}

exports.getFaq = getFaq;
exports.getUserGuide = getUserGuide;
exports.newMessage = newMessage;