import React, { useState } from 'react';
import SettingSection from '../../../../components/settingSection/SettingSection';
import Text from '../../../../../../Interface/Text/Text';
import InputButton from '../../../../../../Interface/containers/inputButton/InputButton';
import Select from '../../../../../../Interface/inputs/select/Select';
import Processing from '../../../../../../Interface/loaders/processing/Processing';
import Button from '../../../../../../Interface/buttons/button/Button';
import ReportDataGrid from '../../../../../../Interface/report/reportDataGrid/ReportDataGrid';
import useInput from '../../../../../../hooks/useInput';
import Stamp from '../../../../../../Interface/stamp/Stamp';

function ChangeAccountable(props) {
    const newAccountable = useInput({name: 'newAccountable', required: true});

    const {accountableChangeRequest: request, hasRoleChangeRequest, accountableOptions} = props;

    const handleOnSendRequest = async () => {
        const resOk = await props.onSendRequest(JSON.parse(newAccountable.value)._id);

        if(resOk) newAccountable.setValue('');
    }

    const handleOnCancelRequest = () => {
        console.log('click')
        props.onCancelRequest();
    }

    let requestData = null;

    if(request) {
        requestData = [
            {title: 'New Accountable', value: request.data.newAccountable.name},
            {title: 'Requested On', value: new Date(request.meta.createdOn).toLocaleDateString()},
            ...request.approvers.map(approver => ({
                title: approver.name, 
                value: <Stamp type={approver.response || 'pending'}/>
            }))
        ];
    }

    return (
        <SettingSection title='Change Accountable'>
            {hasRoleChangeRequest && 
                <Text color='grey'>
                    You have a role change request in process. Await until it completes before requesting an approver change.
                </Text>
            }
            {request &&
                <>
                    <ReportDataGrid data={requestData} />
                    <Button 
                        style={{marginTop: '2rem'}}
                        icon='close' 
                        iconWeight={300} 
                        color='red' 
                        onClick={handleOnCancelRequest}
                    >Cancel Request</Button>
                </>
            }
            {!request && !hasRoleChangeRequest &&
                <>
                    <Text color='grey'>Select your new accountable. Your current and new accountable must approve this change.</Text>
                    <InputButton>
                        <Select
                            style={{minWidth: '300px'}}
                            input={newAccountable}
                            placeholder='New accountable'
                            options={accountableOptions}
                        />
                        <Button 
                            icon='send' 
                            iconWeight={300} 
                            color='green' 
                            disabled={!newAccountable.isValid}
                            onClick={handleOnSendRequest}
                            awaiting={props.awaitingResponse}
                        >Send Request</Button>
                    </InputButton>
                </>
            }
        </SettingSection>     
     );
}

export default ChangeAccountable;