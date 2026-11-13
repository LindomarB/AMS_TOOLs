import React from 'react';
import style from './Resolution.module.css';
import Header from '../header/Header';
import Button from '../buttons/button/Button';
import capitalize from '../../../functions/text/capitalize';
import ReportDataGrid from '../report/reportDataGrid/ReportDataGrid';
import Text from '../Text/Text';
import CopyButton from '../buttons/copyButton/CopyButton';

function Resolution(props) {
    const handleOnEditSection = (section) => {
        props.onEditSection(section);
    }

    const resolution = structuredClone(props.resolution);
    delete resolution._id;

    resolution.classification.children = (
        <>
            <Text size={16} weight={500}>{resolution.classification.classification}</Text>
            <Text color='grey'>{resolution.classification.description}</Text>
        </>
    );

    if(!resolution.pbi || !resolution.pbi.number) {
        delete resolution.pbi;
    }

    if(!resolution.kba || !resolution.kba.number) {
        delete resolution.kba;
    }

    const problem = Object.keys(resolution.problem).reduce((data, field) => {
        if(field === 'problem') return data;

        if(field === 'reopening reason' && resolution.problem['is reopening'] === 'no') return data;

        data.push({
            title: capitalize(field, true),
            value: capitalize(resolution.problem[field], true)
        });

        return data;
    }, []);

    resolution.problem.children = (
        <>
            <Text weight={500} style={{marginBottom: '1rem'}}>{resolution.problem.problem}</Text>
            <ReportDataGrid data={problem}/>
        </>
    );

    resolution.solution.children = (
        <>
            <Text weight={500}>{resolution.solution.solution}</Text>
            {resolution.solution['used sql'] === 'yes' &&
                <>
                    <div className={style.sqlCodeTitle}>
                        <Text color='grey'>SQL Code Used</Text>
                        <CopyButton 
                            type='icon'
                            iconSize={20}
                            text={resolution.solution['sql code']}
                            tooltip='Copy SQL'
                        />
                    </div>
                    <Text pre className={style.sqlCode} size={16} weight={500}>{resolution.solution['sql code']}</Text>
                </>
            }
            {resolution.solution['was user guided'] &&
                <ReportDataGrid style={{marginTop: '1rem'}} data={[
                    {title: 'Was user guided?', value: capitalize(resolution.solution['was user guided'])}
                ]}/>
            }
            {resolution.solution['main incident'] &&
                <ReportDataGrid style={{marginTop: '1rem'}} data={[
                    {title: 'Main incident', value: capitalize(resolution.solution['main incident'])}
                ]}/>
            }
        </>
    );

    const sla = Object.keys(resolution.sla).reduce((data, field) => {
        if(!resolution.sla[field] || field === 'breach description') return data;

        let value = capitalize(resolution.sla[field], true);

        if(field === 'breach reason') {
            value = (
                <Text span weight={500}>
                    {value}<br/>
                    <Text span color='grey'>{resolution.sla['breach description']}</Text>
                </Text>
            );
        }

        data.push({
            title: capitalize(field, true),
            value
        });

        return data;
    }, []);

    resolution.sla.children = <ReportDataGrid data={sla}/>;

    let meta = null;

    if(resolution.meta) {
        meta = [
            {
                title: capitalize('created by'),
                value: `${resolution.meta['created by'].name} (${resolution.meta['created by'].cargillId}) on ${new Date(resolution.meta['created on']).toLocaleString()}`
            }
        ];

        if(resolution.meta.changeHistory) {
            const lastModification = resolution.meta.changeHistory.changes[resolution.meta.changeHistory.changes.length - 1];
            meta.push({
                title: 'Last modification by',
                value: `${lastModification.user.name} (${lastModification.user.cargillId}) on ${new Date(lastModification.date).toLocaleString()}`
            });
        }
        // resolution.meta['created by'] = `${resolution.meta['created by'].name} (${resolution.meta['created by'].cargillId}) on ${new Date(resolution.meta['created on']).toLocaleString()}`;

        // delete resolution.meta['created on'];
        // delete resolution.meta.changeHistory
        // if(resolution.meta['modified by']) {
        //     resolution.meta['modified by'] = `${resolution.meta['modified by'].name} (${resolution.meta['modified by'].cargillId}) on ${new Date(resolution.meta['modified on']).toLocaleString()}`;
        //     delete resolution.meta['modified on'];
        // }

        

        // meta = Object.keys(resolution.meta).reduce((data, field) => {
        //     data.push({
        //         title: capitalize(field),
        //         value: resolution.meta[field]
        //     });
        //     return data;
        // }, []);
        
        delete resolution.meta;
    }

    for(let section in resolution) {
        if(resolution[section].children) continue;

        const data = Object.keys(resolution[section]).map(field => ({
            title: capitalize(field, true),
            value: capitalize(resolution[section][field], true)
        }));
    
        resolution[section].children = <ReportDataGrid data={data}/>;        
    }

    const sections = Object.keys(resolution).map(section => {
        return (
            <section key={section} className={style.section}>
                <Header 
                    className={style.header}
                    text={section === 'sla' || section === 'pbi' || section === 'kba'? section.toUpperCase() : capitalize(section)}
                >
                    {props.enableEdit &&
                        <Button 
                            type='icon'
                            icon='edit_note' 
                            tooltip='Edit' 
                            onClick={handleOnEditSection.bind(null, section)}
                        />
                    }
                </Header>
                {resolution[section].children}
            </section>
        );
    });

    return (
        <div className={`${style.Resolution} ${props.className || ''}`}>
            {sections}
            {meta &&
                <section className={style.section}>
                    <ReportDataGrid data={meta}/>
                </section>
            }
        </div>        
    );
}

export default Resolution;