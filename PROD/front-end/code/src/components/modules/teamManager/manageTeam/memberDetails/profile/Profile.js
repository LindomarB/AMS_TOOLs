import React, { useContext, useEffect, useState } from 'react';
import Text from '../../../../../Interface/Text/Text';
import SettingSection from '../../../../settings/components/settingSection/SettingSection';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import Loading from '../../../../../Interface/loaders/loading/Loading';
import UserResume from '../../../../../Interface/user/userResume/UserResume';

function Profile(props) {
    const [roles, setRoles] = useState();
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const res = await fetcher.getRoles();

        if(res.ok) {
            setRoles(res.data);
        }
    }

    const memberData = structuredClone(props.member);
    delete memberData.accountables;

    return (
        <>
            <SettingSection title='Profile'>
                <UserResume 
                    user={memberData} 
                    info={['profile']}
                    notShow={{
                        profile: ['user photo']
                    }}
                    removeHeader
                />
            </SettingSection>
            <SettingSection title='Role'>
                {roles
                    ? <Text color='grey'>{roles[props.member.profile.role].description}</Text>
                    : <Loading />
                }
            </SettingSection>
        </>
    );
}

export default Profile;