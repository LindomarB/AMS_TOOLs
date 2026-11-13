import React from 'react';
import ReportData from "../../../report/reportData/ReportData";
import DataHeader from './dataHeader/DataHeader';

function getCtiData(user, notShow = [], removeHeader) {
    if(!user.settings['cti tool']) return null;

    const data = [];

    data.push({
        title: 'Applications',
        value: user.settings['cti tool'].applications.map(application => application.name).sort(),
        icon: 'resolution'
    });

    data.push({
        title: 'Support Groups',
        value: [...new Set(user.settings['cti tool'].applications.map(application => application['support group']).sort())],
        icon: 'support group'
    });

    const info = [];

    if(!removeHeader) {
        const header = DataHeader({
            icon: 'cti tool' ,
            text: 'CTI Tool'
        });

        info.push(header);
    }

    info.push(...
        data.filter(info => !notShow.includes(info.title.toLowerCase()))
        .map(info => <ReportData key={info.title} {...info}/>)
    ); 
    
    return info;
}

export default getCtiData;