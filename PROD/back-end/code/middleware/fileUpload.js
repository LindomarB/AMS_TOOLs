const fs = require('fs');
const multer = require('multer');
const {v1: uuid} = require('uuid');

function createFileUploader({accept = '*', fileSize = 5000000, destination = 'uploads', type='array', field}) {
    if(!fs.existsSync(destination)) {
        fs.mkdirSync(destination, {recursive: true});
    }

    const diskStorage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination);
        },
        filename: (req, file, callback) => {
            const originalName = file.originalname && file.originalname.slice(0, file.originalname.indexOf('.'));
            const name = `${originalName || ''} - ${uuid()}.${file.mimetype.split('/')[1]}`;
            callback(null, name);
        }
    });
    
    const fileFilter = (req, file, callback) => {
        const fileExtension = file.mimetype.split('/')[1];
        const isValid = accept === '*' || accept.includes(fileExtension);
        let error = null;

        if(!isValid) {
            error = Error('Invalid file format');
            error.code = 'Some file has an unallowed format';
        }

        callback(error, isValid);
    }
    
    const fileUploader = multer({
        limits: {fileSize},
        storage: diskStorage,
        fileFilter
    });

    const errorFunc = (err, res, next) => {
        
        if(!err) return next();
        
        let message = err.code;

        if(err.code === 'LIMIT_FILE_SIZE') {
            message = 'Some file is exceeding the allowed size'
        }

        res.status(500);
        return res.json({message});
    }

    return (req, res, next) => {
        fileUploader[type](field)(req, res, (err) => errorFunc(err, res, next));
    };
}

module.exports = createFileUploader;