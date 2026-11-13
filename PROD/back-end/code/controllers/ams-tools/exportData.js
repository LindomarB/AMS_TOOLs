const User = require("../../model/User");
const ExcelJS = require("exceljs");

async function exportData(req, res, model) {
    const pipeline = [
        {$match: req.query}
    ];

    const projection = req.querySettings.export.reduce((projection, setting) => {
        projection[setting.as] = `$${setting.field}`;        
        return projection;
    }, {_id: 0});

    pipeline.push({$project: projection});

    const data = await model.aggregate(pipeline);
    const user = await User.get({_id: req._id});

    data.forEach(document => {
        for(let field in document) {
            if(Array.isArray(document[field])) {
                document[field] = document[field].join(', ');
            }
        }
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = user.profile.name;
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('data');
    worksheet.columns = req.querySettings.export.map(setting => ({
        header: setting.as,
        key: setting.as
    }));
    worksheet.addRows(data);
    
    res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="data ${new Date().toLocaleDateString()}"`
    });
    
    workbook.xlsx.write(res);
}

function exportToExcel({res, headers, rows, creator}) {
    rows.forEach(document => {
        for(let field in document) {
            if(Array.isArray(document[field])) {
                document[field] = document[field].join(', ');
            }
        }
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = creator;
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('data');
    worksheet.columns = headers.map(header => ({
        header,
        key: header
    }));
    worksheet.addRows(rows);
    
    res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="data ${new Date().toLocaleDateString()}"`
    });
    
    workbook.xlsx.write(res);
}

async function convertToExcel(req, res) {
    const {headers, rows} = req.body;

    const user = await User.get({_id: req._id});

    rows.forEach(document => {
        for(let field in document) {
            if(Array.isArray(document[field])) {
                document[field] = document[field].join(', ');
            }
        }
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = user.profile.name;
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('data');
    worksheet.columns = headers.map(header => ({
        header,
        key: header
    }));
    worksheet.addRows(rows);
    
    res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="data ${new Date().toLocaleDateString()}"`
    });
    
    workbook.xlsx.write(res);
}

exports.exportData = exportData;
exports.exportToExcel = exportToExcel;
exports.convertToExcel = convertToExcel;