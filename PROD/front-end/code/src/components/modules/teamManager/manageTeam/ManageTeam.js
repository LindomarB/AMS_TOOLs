import React, { useContext } from "react";
import UserContext from "../../../context/userContext/UserContext";
import Page from "../../../Interface/page/Page";
import TeamMembersList from "./teamMembersList/TeamMembersList";
import { useNavigate } from "react-router-dom";

function ManageTeam(props) {
    const user = useContext(UserContext).user;
    const navigate = useNavigate();

    const handleOnClickMember = (member) => {
        navigate(`${member._id}/account/accountables`);
    }

    return (
        <Page>
            <TeamMembersList
                name='team-members'
                headerProps={{
                    text: 'Manage Team',
                    iconProps: {
                        name: 'manage team',
                        filled: true
                    },
                    color: 'theme'
                }}
                user={user}
                onClickMember={handleOnClickMember}
            />
        </Page>
    );
}

export default ManageTeam;