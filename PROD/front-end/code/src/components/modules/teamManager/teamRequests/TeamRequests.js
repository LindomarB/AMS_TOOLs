import React, { useContext } from "react";
import UserContext from "../../../context/userContext/UserContext";
import Page from "../../../Interface/page/Page";
import RequestList from "../../../Interface/requestList/RequestList";
import TeamRequest from "../../../Interface/requestList/teamRequest/TeamRequest";

function TeamRequests(props) {
    const user = useContext(UserContext).user;

    return (
        <Page>
            <RequestList
                headerProps={{
                    text: 'Team Requests',
                    iconProps: {
                        name: 'team requests',
                        filled: true
                    },
                    color: 'theme'
                }}
                listItem={<TeamRequest />} 
                query={{'approvers._id': user._id}}
            />
        </Page>
    );
}

export default TeamRequests;