import React from 'react';
import Icon from '../../../../../../../Interface/icons/icon/Icon';
import ListItem from '../../../../../../../Interface/list/listItem/ListItem';
import PopBoxConfirmation from '../../../../../../../Interface/popBox/popBoxConfirmation/PopBoxConfirmation';
import Text from '../../../../../../../Interface/Text/Text';
import style from './AllowedSupportGroup.module.css';

function AllowedSupportGroup(props) {
    const removeButton = props.onRemove && (
        <PopBoxConfirmation
            tooltip='Remove'
            iconProps={{
                name: 'close',
                weight: 400
            }}
            hoverColor='red'
            question={`Do you really want to remove this access?\nResolutions in progress for this support group will be deleted.`}
            onClickYes={props.onRemove}
            container={props.popBoxContainer}
        />
    );

    const applications = props.supportGroup.applications.map(application => (
        <Text key={application._id}>
            {props.userApplications.includes(application._id)
                ? <Icon name='check_circle' color='green' weight={300}/>
                : <Icon name='close' color='red' weight={300}/>
            }
            {application.name}
            {application.status === 'decommissioned' &&
                <Text span className={style.decommissioned} weight={600} color='red'>(Decommissioned)</Text>
            }
        </Text>
    ));

    return (
        <ListItem
            childrenContainerClassName={style.applicationsContainer}
            subtitleClassName={style.subtitle}
            onClick={props.onClick} 
            title={props.supportGroup.name}
            rightContent={removeButton} 
            subtitle='Applications'
        >
            {applications}
        </ListItem>
    );
}

export default AllowedSupportGroup;