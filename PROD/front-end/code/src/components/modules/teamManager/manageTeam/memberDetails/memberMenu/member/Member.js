import React from 'react';
import Text from '../../../../../../Interface/Text/Text';
import UserPhoto from '../../../../../../Interface/user/userPhoto/UserPhoto';
import style from './Member.module.css';

function Member(props) {
    return (
        <div className={style.Member}>
            <UserPhoto 
                className={style.userPhoto} 
                user={props.member.profile.name} 
                color={props.member.settings.profile.avatarColor} 
                badge={props.member.status}
            />
            <div className={style.info}>
                <Text size={16} weight={500} ellipsis oneLine>{props.member.profile.name}</Text>
                <Text color='grey' ellipsis oneLine>{props.member.profile.email}</Text>
            </div>
        </div>
    );
}

export default Member;