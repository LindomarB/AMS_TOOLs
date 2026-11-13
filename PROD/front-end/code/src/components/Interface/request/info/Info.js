import React from 'react';
import capitalize from '../../../../functions/text/capitalize';
import ReportData from '../../report/reportData/ReportData';
import getRequestInfo from './getRequestInfo';
import Rule from '../../rule/Rule';

function Info(props) {
    const data = getRequestInfo(props.request, props.lang);

    const info = data.map(datum => <ReportData key={datum.title} {...datum}/>);

    return (
        <>
            <ReportData
                title='Type'
                value={capitalize(props.request.type)}
                icon='team requests'
            />
            {info}            
        </>
    );
}

export default Info;