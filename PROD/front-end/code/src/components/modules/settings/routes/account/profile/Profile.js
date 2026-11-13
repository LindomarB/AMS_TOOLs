import React, { useContext } from 'react';
import UserContext from '../../../../../context/userContext/UserContext';
import SettingSection from '../../../components/settingSection/SettingSection';
import UserResume from '../../../../../Interface/user/userResume/UserResume';
import style from './Profile.module.css';

function Profile(props) {
    const userCtx = useContext(UserContext);

    const user = structuredClone(userCtx.user);
    delete user.accountables;

    return (
        <SettingSection>
            <UserResume 
                className={style.userResume}
                user={user} 
                info={['profile']}
                notShow={{
                    profile: ['name']
                }}
                removeHeader
            />
        </SettingSection>
    );
}

export default Profile;