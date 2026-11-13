import React, { useContext, useState } from "react";
import TeamMembersList from "../../teamMembersList/TeamMembersList";
import InfoDrawer from "../../../../../Interface/drawer/infoDrawer/InfoDrawer";
import UserResume from "../../../../../Interface/user/userResume/UserResume";
import FetcherContext from "../../../../../context/fetcherContext/FetcherContext";
import style from './MemberTeam.module.css';

function MemberTeam(props) {
    const [memberInfo, setMemberInfo] = useState();
    const fetcher = useContext(FetcherContext);

    const getMember = async (memberId) => {
        const res = await fetcher.getUsers(
            {
                query: {_id : memberId},
                settings: {
                    projection: {
                        'settings.alerts': 0,
                        'settings.notifications': 0
                    },
                    getCtiApplications: true
                }
            }
        );

        setMemberInfo(res.ok? res.data[0] : null);
    }

    const handleOnClickMember = (member) => {
        getMember(member._id);
    }

    const handleOnClose = () => {
        setMemberInfo(null);
    }

    return (
        <>
            <TeamMembersList
                accountableView 
                user={props.member} 
                header='Team Members'
                onClickMember={handleOnClickMember}
                projection={{
                    'profile.cargillId': 1,
                    accountables: {
                        name: 1,
                        cargillId: 1
                    }
                }}
            />
            <InfoDrawer
                header={{
                    text: 'Member Details'
                }}
                elementKey={memberInfo && memberInfo._id}
                onClose={handleOnClose}
            >
                {memberInfo &&
                    <UserResume 
                        className={style.userResume}
                        user={memberInfo}
                        notShow={{
                            profile: ['user photo']
                        }}
                    />
                }
            </InfoDrawer>
        </>
    );
}

export default MemberTeam;