import React from 'react';
import capitalize from "../../../../../functions/text/capitalize";
import ReportData from "../../../report/reportData/ReportData";
import DataHeader from './dataHeader/DataHeader';

function getAccessData(user, notShow = [], removeHeader) {
    if(!user.accesses) return null;

    const data = [];

    data.push({
        title: 'Tools',
        value: user.accesses.sort().map(access => capitalize(access, false)),
        icon: 'tools'
    });

    const info = [];

    if(!removeHeader) {
        const header = DataHeader({
            icon: 'access' ,
            text: 'accesses'
        });

        info.push(header);
    }

    info.push(...
        data.filter(info => !notShow.includes(info.title.toLowerCase()))
        .map(info => <ReportData key={info.title} {...info}/>)
    ); 
    
    return info;
}

export default getAccessData;