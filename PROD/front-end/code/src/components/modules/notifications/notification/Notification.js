import React from 'react';
import Icon from '../../../Interface/icons/icon/Icon';
import ListItem from '../../../Interface/list/listItem/ListItem';
import Text from '../../../Interface/Text/Text';
import SystemPhoto from '../../../Interface/user/userPhoto/SystemPhoto';
import UserPhoto from '../../../Interface/user/userPhoto/UserPhoto';
import style from './Notification.module.css';

function Notification(props) {
    const icon = props.author.name.toLowerCase() === 'ams tools'
        ? <SystemPhoto type={props.type} badge={props.badge}/>
        : <UserPhoto user={props.author.name} badge={props.type} color={props.author.avatarColor}/>;

    const visibilityData = {
        global: {
            icon: 'global',
            subtitle: 'Global'
        },
        team: {
            icon: 'team',
            subtitle: 'Team'
        },
        accountable: {
            icon: 'accountable',
            subtitle: 'Accountable'
        },
        leaders: {
            icon: 'leaders'
        },
        private: {
            icon: 'private',
            subtitle: 'Private'
        },
        system: {
            icon: 'system',
            subtitle: 'System'
        },
    };

    // if(props.visibility === 'leaders') {
    //     const leaders = props.leaders.sort();
    //     const subtitle = [leaders[0]];

    //     for(let i = 1; i < leaders.length; i++) {
    //         subtitle.push(<Icon key={`icon-${i}`} name='dot' size={10} filled style={{color: '#C3C3C3'}}/>);
    //         subtitle.push(<Fragment key={`subtitle-${i}`}>{leaders[i]}</Fragment>);
    //     }

    //     visibilityData.leaders.subtitle = <Text span style={{display: 'flex', alignItems: 'center', columnGap: '0.25rem'}}>{subtitle}</Text>;
    // }

    // const visibility = visibilityData[props.visibility];

    let tag = null;

    if(props.new) {
        tag = (
            <Text className={style.textNew} size={12} color='darkOrange' weight={600}>
                <Icon name='priority_high' size={12} color='darkOrange' weight={500}/>
                New
            </Text> 
        );
    }
    
    const notificationDate = new Date(props.date);
    const date = notificationDate.toLocaleDateString() === new Date().toLocaleDateString()
            ? notificationDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            : notificationDate.toLocaleString([], {year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

    const textProps = props.new? {weight: 600} : null;

    return (
        <ListItem 
            className={`${style.Notification}`}
            active={props.active}
            onClick={props.onClick} 
            icon={icon} 
            title={props.title || props.author.name} 
            rightText={date} 
            rightTextProps={textProps}
            // subtitleIcon={visibility.icon} 
            // subtitle={visibility.subtitle} 
            text={props.text}
            textProps={textProps}
            tag={tag}
        />
    );
}

Notification.defaultProps = {
    activeClassName: style.new
};

export default Notification;