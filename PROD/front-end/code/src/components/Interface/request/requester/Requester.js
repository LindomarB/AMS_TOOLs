import React from 'react';
import capitalize from '../../../../functions/text/capitalize';
import ReportData from '../../report/reportData/ReportData';
import Rule from '../../rule/Rule';

function Requester(props) {
    if(props.request.type === 'new account') return null;
    
    const data = [
        {
            title: 'Requester',
            value: props.request.requester.name,
            icon: 'person'
        },
        {
            title: 'Email',
            value: props.request.requester.email, 
            icon: 'email'
        },
        {
            title: 'Cargill ID',
            value: props.request.requester.cargillId, 
            icon: 'id'
        },
        {
            title: 'Role',
            value: capitalize(props.request.requester.role),
            icon: 'role'
        },
        // {
        //     title: 'Accountables',
        //     value: props.request.requester.accountables.map(accountable => accountable.name).sort(),
        //     icon: 'accountable'
        // }
    ];

    const items = data.map(datum =>
        <ReportData key={datum.title} {...datum}/>
    );

    return (
        <>
            <Rule />
            {items}
        </>
    );
}

export default Requester;