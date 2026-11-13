import React from 'react';
import ReportDataGrid from '../../../../../Interface/report/reportDataGrid/ReportDataGrid';
import capitalize from '../../../../../../functions/text/capitalize';
import style from './ChangeHistory.module.css';
import Text from '../../../../../Interface/Text/Text';
import Icon from '../../../../../Interface/icons/icon/Icon';

function ChangeHistory(props) {
    const changeHistory = structuredClone(props.resolution.meta.changeHistory);

    changeHistory.changes.unshift({
        date: props.resolution.meta['created on'],
        user: props.resolution.meta['created by'],
        changes: changeHistory.original
    });

    const changes = [];

    for(let i = changeHistory.changes.length - 1; i >= 0; i--) {
        const change = changeHistory.changes[i];
        const date = new Date(change.date).toLocaleString();
        const sections = [];
        const original = i === 0;

        for(let section in change.changes) {
            const fields = Object.keys(change.changes[section]).map(field => ({
                title: capitalize(field),
                value: field === 'sql code'
                    ? <Text pre className={style.sqlCode}>{change.changes[section][field] || '-'}</Text>
                    : change.changes[section][field]
            }));

            sections.push((
                <div key={section} className={style.section}>
                    <Text weight={600}>{capitalize(section)}</Text>
                    <ReportDataGrid data={fields}/>
                </div>
            ));
        }

        changes.push((
            <div key={change.date} className={style.changeContainer}>
                <Icon name={original? 'trip_origin' : 'adjust'} weight={300}/>
                <div className={style.change}>
                    <div className={style.header}>
                        <Text color='icon' weight={600}>{date}{original? ' (Original)' : ''}</Text>
                        <Text color='grey'>
                            {original? 'Created by' : 'Modified by'}
                            <Text span color='grey' weight={600}>{` ${change.user.name} (${change.user.cargillId})`}</Text>
                        </Text>
                    </div>
                    <div className={style.sections}>
                        {sections}
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className={style.ChangeHistory}>
            {changes}
        </div>
    );
}

export default ChangeHistory;