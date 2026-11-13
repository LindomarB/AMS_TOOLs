import React from 'react';
import ResolutionProgress from './resolutionProgress/ResolutionProgress';
import Text from '../../../../../../Interface/Text/Text';
import PopBoxConfirmation from '../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import ListItem from '../../../../../../Interface/list/listItem/ListItem';
import style from './Resolution.module.css';

function Resolution(props) {
    const icon = <ResolutionProgress progress={props.resolution.meta.progress}/>;
    const text = (
        <span className={style.text}>
            <span>{props.resolution.incident.application || '-'}</span>
            <span>{props.resolution.classification.classification || '-'}</span>
            <span>{(props.resolution.pbi && props.resolution.pbi.number) || 'No PBI'}</span>
        </span>
    );

    const expireOn = 30 - Math.floor((new Date().getTime() - new Date(props.resolution.meta['created on'].slice(0, 10)).getTime()) / 86400000);
    const deleteButton = (
        <>
            <Text color='grey' size={12}>Expire {expireOn === 1? 'today' : `in ${expireOn} days`}</Text>
            <PopBoxConfirmation
                text='Delete'
                icon='delete'
                hoverColor='red'
                question='Do you really want to delete this progress?'
                onClickYes={props.onDelete}
                container={props.popBoxContainer}
            />
        </>
    );

    return (
        <ListItem
            onClick={props.onClick} 
            icon={icon} 
            title={props.resolution.incident.incident || '-'} 
            // rightText={props.resolution.meta.progress === 100? 'Complete' : 'In Progress'}
            rightContent={props.onDelete && deleteButton}
            text={text}
        />
    );
}

export default Resolution;