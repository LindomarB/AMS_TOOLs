import React from 'react';
import capitalize from '../../../functions/text/capitalize';
import Header from '../header/Header';
import ReportDataGrid from '../report/reportDataGrid/ReportDataGrid';
import Text from '../Text/Text';
import Stamp from '../stamp/Stamp';
import style from './Application.module.css';

function Application(props) {
    if(!props.data) return null;
    
    const application = structuredClone(props.data);

    const order = {
        application: [
            'technology',
            'interfaces'
        ],
        Location: [
            'region',
            'country',
            'business unit'
        ],
        Support: [
            'group',
            'support group',
            'app owner',
            'sdm',
            'app lead',
            'track lead',
            'coverage',
            'shifts'
        ],
        Notes: [
            'notes'
        ]
    } 

    const data = Object.keys(order).reduce((data, section) => {
        data[section] = order[section].map(field =>({
            title: capitalize(field),
            value: Array.isArray(application[field])? application[field].join(', ') : application[field]
        }));

        return data;
    }, {});

    data.application.push({
        title: 'Status',
        value: <Stamp type={application.status}/>
    });

    const sections = ['Location', 'Support'].map(section => (
        <section key={section} className={style.section}>
            <Header className={style.header} text={section}/>
            <ReportDataGrid data={order[section].map(field =>({
                title: capitalize(field),
                value: Array.isArray(application[field])? application[field].join(', ') : application[field]
            }))}/>
        </section>
    ));

    if(application.notes) {
        sections.push((
            <section key={'Notes'} className={style.section}>
                <Header className={style.header} text={'Notes'}/>
                <Text>{application.notes}</Text>
            </section>
        ));
    }

    return (
        <div className={style.Application}>
            <section className={style.section}>
                <Header className={style.header} text={application.name}/>
                <Text>{application.description}</Text>
                <ReportDataGrid data={data.application}/>
            </section>
            {sections}
        </div>
    );
}

export default Application;