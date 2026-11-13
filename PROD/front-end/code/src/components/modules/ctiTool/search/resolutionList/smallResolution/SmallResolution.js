import React from 'react';
import ReportDataGrid from '../../../../../Interface/report/reportDataGrid/ReportDataGrid';
import Text from '../../../../../Interface/Text/Text';
import Tooltip from '../../../../../Interface/tooltip/Tooltip';
import style from './SmallResolution.module.css';

function SmallResolution(props) {
    const tooltip = (
        <>
            <ReportDataGrid data={[
                {title: 'Incident', value: props.data.incident.incident},
                {title: 'Created on', value: new Date(props.data.meta['created on']).toLocaleDateString()},
                {title: 'PBI', value: props.data.pbi && props.data.pbi.number || '-'},
                {title: 'KBA', value: props.data.kba && props.data.kba.number || '-'},
                {title: 'Country', value: props.data.incident.country},
                {title: 'Support Group', value: props.data.incident['support group']},
                {title: 'Application', value: props.data.incident.application},
                {title: 'Classification', value: props.data.classification.classification},
            ]}/>
        </>
    );
        
    const textProps = {
        color: 'absoluteBlack',
        weight: props.active? 600 : 400
    };

    return (
        <Tooltip
            position='right'
            appearDelay={200}
            hideDelay={0}
            content={tooltip}
        >
            <div className={style.SmallResolution}>
                <div className={style.row}>
                    <Text {...textProps}>{props.data.incident.incident}</Text>
                    <Text {...textProps} ellipsis>{props.data.incident.country}</Text>
                    <Text {...textProps} ellipsis>{props.data.incident.application}</Text>
                </div>
                <div className={style.row}>
                    <Text color='grey' size={12} ellipsis>{props.data.classification.classification}</Text>
                    <Text color='grey' size={12} ellipsis>{props.data.pbi && props.data.pbi.number || '-'}</Text>
                    <Text color='grey' size={12} ellipsis>{props.data.kba && props.data.kba.number || '-'}</Text>
                </div>
            </div>
        </Tooltip>
    );
}

export default SmallResolution;