import React from 'react';
import Icon from '../../../../Interface/icons/icon/Icon';
import Text from '../../../../Interface/Text/Text';
import style from './RequestResponse.module.css';
import ReportData from '../../../../Interface/report/reportData/ReportData';

function RequestResponse(props) {
    const {status, approvers, userConflictingData, accountables} = props.res;
    
    const iconProps = {
        className: style.icon,
        type: 'rounded',
        filled: true,
        size: 56,
        weight: 400,
        border: true,
        invertColor: true
    };

    const iconTextProps = {
        className: style.iconText,
        size: 20,
        weight: 500,
        align: 'center' 
    };

    const approversContact = <ReportData value={approvers.map(approver => ({
        title: approver.name,
        value: approver.email
    }))}/>;

    switch(status) {
        case 'ok': 
            return (
                <div className={style.RequestResponse}>
                    <Icon style={{alignSelf: 'center'}} name='check_circle' filled color='green' size={56} weight={400}/>
                    <Text {...iconTextProps}>Your request was done!</Text>
                    {approvers.length === 1
                        ? (
                            <>
                                <Text><Text span weight={600}>{approvers[0].name}</Text> will be notified about your request. When it is approved, you will be able to log in AMS Tools.</Text>
                                <Text>If you need, you can contact <Text span weight={600}>{approvers[0].name}</Text> at <Text span weight={600}>{approvers[0].email}</Text>.</Text>
                            </>
                        )
                        : (
                            <>
                                <Text>All administrators will be notified about your request. When it is approved, you will be able to log in AMS Tools.</Text>
                                <Text>If you need, you can contact them:</Text>
                                {approversContact}
                            </>
                        )
                    }
                </div>
            );
        case 'pending': 
            return (
                <div className={style.RequestResponse}>
                    <Icon {...iconProps} name='warning' color='yellow' iconStyle={{transform: 'translateY(-0.25rem)'}}/>
                    <Text {...iconTextProps}>Account Request In Progress</Text>
                    <Text>An account request already exists for <Text span weight={600}>{userConflictingData}</Text> .</Text>
                    <Text>Please, wait for the approval. For more information you can contact:</Text>
                    {approversContact}
                </div> 
            );
        case 'refused': 
            const approver = approvers.find(approver => approver.response);    

            return (
                <div className={style.RequestResponse}>
                    <Icon {...iconProps} name='refused' color='red'/>
                    <Text {...iconTextProps}>Account Request Refused</Text>
                    <Text>An account request has already been made for <Text span weight={600}>{userConflictingData}</Text> and has been refused by <Text span weight={600}>{approver.name}</Text>.</Text>
                    <Text>Make sure you understand why your previous request was refused before submitting a new one.</Text>
                    {approver.refusalReason && 
                        (
                            <div className={style.refusalReason}>
                                <div className={style.header}>
                                    <Icon name='sms_failed' color='red' type='rounded' filled weight={300} size={20}/>
                                    <Text size={16} weight={600}>Refusal Reason</Text>
                                </div>
                                <Text>{approver.refusalReason}</Text>
                            </div>
                        )
                    }
                    <Text>For more information you can contact:</Text>
                    {approversContact}
                </div> 
            );
        case 'active': 
            return (
                <div className={style.RequestResponse}>
                    <Icon {...iconProps} name='warning' color='yellow' iconStyle={{transform: 'translateY(-0.25rem)'}}/>
                    <Text {...iconTextProps}>Active Account</Text>
                    <Text>An account already exists for <Text span weight={600}>{userConflictingData}</Text>.</Text>
                    <Text>Please, return to the log in screen to access AMS Tools.</Text>
                </div> 
            );
        case 'locked': 
            const accountableContacts = <ReportData data={accountables.map(accountable => ({
                title: accountable.name,
                value: accountable.email
            }))}/>;

            return (
                <div className={style.RequestResponse}>
                    <Icon {...iconProps} name='locked' color='red'/>
                    <Text {...iconTextProps}>Locked Account</Text>
                    <Text>An account already exists for <Text span weight={600}>{userConflictingData}</Text> and is locked.</Text>
                    <Text>For more information contact your accountables:</Text>
                    {accountableContacts}
                </div> 
            );
        default:
            return null;
    };
}

export default RequestResponse;