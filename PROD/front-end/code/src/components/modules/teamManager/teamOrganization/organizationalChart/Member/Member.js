import React from 'react';
import UserPhoto from '../../../../../Interface/user/userPhoto/UserPhoto';
import Tooltip from '../../../../../Interface/tooltip/Tooltip';
import Text from '../../../../../Interface/Text/Text';
import capitalize from '../../../../../../functions/text/capitalize';
import UserResume from '../../../../../Interface/user/userResume/UserResume';
import style from './Member.module.css';

function Member(props) {
    if(!props.user) return null;

    const handleOnClick = () => {
        props.onClick(props.user, props.info);
    }

    const {name, cargillId, role} = props.user.profile;
    const badge = props.badge || props.user._badge;

    const details = (
        <UserResume
            className={style.userResume}
            // infoClassName={style.userResumeInfo}
            user={props.user} 
            info={props.info}
            notShow={{
                profile: ['user photo', 'created on']
            }}
        />
    );

    const sideConnector = role === 'analyst';
    const topConnector = role !== 'administrator';
    const bottomConnector = role !== 'analyst' && props.user._team && !!props.user._team.length;

    return (
        <div id={`member-${props.user._id}`} className={`${style.memberContainer} ${sideConnector? style.analyst : ''} ${props.className || ''}`}>
            {sideConnector
                ? <div className={style.sideConnector}></div>
                : topConnector && <div className={`${style.connector} ${props.shortTopConnector? style.short : ''}`}></div>
            }
            <Tooltip 
                // className={style.tooltip}
                content={details} 
                position='right' 
                holdWhenMouseOver 
                appearDelay={500}
                hideDelay={50}
                disabled
            >
                <div 
                    className={`${style.Member} ${props.user._highlight? style.highlight : ''} ${props.user._selected? style.selected : ''}`}
                    onClick={handleOnClick}
                >
                    <UserPhoto 
                        className={style.userPhoto}
                        user={name}
                        color={props.user.settings.profile.avatarColor}
                        badge={badge}
                    />
                    <div className={style.info}>
                        <Text weight={600} oneLine ellipsis>{name}</Text>
                        {/* <Text>{cargillId}</Text> */}
                        <Text size={12}>{capitalize(role)}</Text>
                    </div>
                </div>
            </Tooltip>
            {bottomConnector &&
                <div className={`${style.connector} ${props.shortBottomConnector? style.short : ''} ${props.analystTeamConnector? style.analystTeamConnector : ''}`}></div>
            }
        </div>
    );
}

export default Member;