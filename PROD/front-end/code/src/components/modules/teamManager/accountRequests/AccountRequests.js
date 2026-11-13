import React, { useContext } from "react";
import UserContext from "../../../context/userContext/UserContext";
import Page from "../../../Interface/page/Page";
import AccountRequest from "../../../Interface/requestList/accountRequest/AccountRequest";
import RequestList from "../../../Interface/requestList/RequestList";

function AccountRequests(props) {
    const user = useContext(UserContext).user;

    return (
        <Page>
            <RequestList 
                headerProps={{
                    text: 'Account Requests',
                    iconProps: {
                        name: 'account requests',
                        filled: true
                    },
                    color: 'theme'
                }}
                listItem={<AccountRequest />} 
                query={{'approvers._id': user._id, type: 'new account'}}
                filters={['search', 'status']}
            />
        </Page>
    );
}

export default AccountRequests;