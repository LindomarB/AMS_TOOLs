import React from 'react';
import Text from '../../../../../Interface/Text/Text';
import style from './Resolution.module.css';

function Resolution(props) {
    const data = [
            props.data.pbi && props.data.pbi.number || '-',
            props.data.kba && props.data.kba.number || '-',
            props.data.incident.country,
            props.data.incident['support group'],
            props.data.incident.application,
            props.data.classification.classification,
            new Date(props.data.meta['created on']).toLocaleDateString(),
    ];

    const resolution = data.map((datum, idx) => (
        <Text 
            key={idx} 
            color='absoluteBlack' 
            ellipsis
            weight={props.active? 600 : 400}
        >{datum}</Text>
    ));

    return (
        <div className={style.Resolution}>
            <Text color='absoluteBlack' weight={props.active? 600 : 400}>{props.data.incident.incident}</Text>
            {resolution}
        </div>
    );
}

export default Resolution;