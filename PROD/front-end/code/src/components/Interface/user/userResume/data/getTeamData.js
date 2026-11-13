import React from 'react';
import capitalize from "../../../../../functions/text/capitalize";
import ReportData from "../../../report/reportData/ReportData";
import DataHeader from './dataHeader/DataHeader';

function getTeamData(user, notShow = [], removeHeader) {
    if(!user._team) return null;

    const team = user._team.reduce((team, member) => {
        const role = member.profile.role;
        team[role] = (team[role] || 0) + 1;
        return team;
    }, {});

    const data = Object.keys(team).sort().map(role => ({
        title: capitalize(role),
        value: team[role],
        icon: role
    }));

    if(!data.length) return null;

    const info = [];

    if(!removeHeader) {
        const header = DataHeader({
            icon: 'team' ,
            text: 'team'
        });

        info.push(header);
    }

    info.push(...
        data.filter(info => !notShow.includes(info.title.toLowerCase()))
        .map(info => <ReportData key={info.title} {...info}/>)
    ); 
    
    return info;
}

export default getTeamData;