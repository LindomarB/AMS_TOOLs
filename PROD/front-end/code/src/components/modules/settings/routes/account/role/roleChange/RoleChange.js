import React from 'react';
import SettingSection from '../../../../components/settingSection/SettingSection';
import useInput from '../../../../../../hooks/useInput';
import style from './RoleChange.module.css';
import capitalize from '../../../../../../../functions/text/capitalize';
import Stamp from '../../../../../../Interface/stamp/Stamp';
import ReportDataGrid from '../../../../../../Interface/report/reportDataGrid/ReportDataGrid';
import Button from '../../../../../../Interface/buttons/button/Button';
import Select from '../../../../../../Interface/inputs/select/Select';
import Text from '../../../../../../Interface/Text/Text';
import roles from '../../../../../../../data/app/roles';

function RoleChange(props) {
    const newAccountable = useInput({
        name: 'newAccountable',
        required: true
    });

    const newRole = useInput({
        name: 'newRole',
        required: true,
        onChangeValue: ({value}) => {
            props.fetchAccountableOptions(value);
            newAccountable.setValue('');
        }
    });

    const {roleChangeRequest, accountableChangeRequestId} = props;

    const handleOnCancelAccountableChangeRequest = async () => {
        const resOk = await props.onCancelAccountableChangeRequest();
        if(resOk) handleOnSendRequest();
    }

    const handleOnSendRequest = async () => {
        const resOk = await props.onSendRequest(newRole.value, JSON.parse(newAccountable.value)._id);

        if(resOk) {
            newRole.setValue('');
            newAccountable.setValue('');
        }
    }

    const handleOnCancelRequest = async () => {
        props.onCancelRequest();
    }

    const handleOnClickNo = () => {
        props.onClickNo();
    }

    const roleOptions = Object.keys(roles)
        .filter(role => role !== props.userRole)
        .map(role => ({value: role, label: capitalize(role)}));

    let requestData = null;

    if(roleChangeRequest) {
        requestData = [
            {title: 'New Role', value: capitalize(roleChangeRequest.data.newRole)},
            {title: 'Requested On', value: new Date(roleChangeRequest.meta.createdOn).toLocaleDateString()}
        ];

        roleChangeRequest.approvers.forEach(approver => 
            requestData.push({
                title: approver.name, 
                value: <Stamp type={approver.response || 'pending'}/>
            })
        );
    }

    return (
        <SettingSection title='Role Change'>
            {roleChangeRequest &&
                <>
                    <ReportDataGrid data={requestData}/>
                    <Button
                        style={{marginTop: '2rem'}}
                        icon='close' 
                        iconWeight={300} 
                        color='red' 
                        onClick={handleOnCancelRequest}
                    >Cancel Request</Button>
                </>
            }
            {!roleChangeRequest && accountableChangeRequestId && 
                <>
                    <Text>Do you want to cancel your approver change request?</Text>
                    <Text color='grey'>You have an approver change request in progress. To request a role change, it needs to be canceled.</Text>
                    <div className={style.buttonsContainer}>
                        <Button 
                            color='red'
                            icon='close'
                            iconWeight={300}
                            onClick={handleOnClickNo}
                        >No</Button>
                        <Button 
                            color='green'
                            icon='done'
                            iconWeight={300}
                            onClick={handleOnCancelAccountableChangeRequest}
                        >Yes</Button>
                    </div>
                </>
            }
            {!roleChangeRequest && !accountableChangeRequestId &&
                <>
                    <Text color='grey'>Select your new role and your new accountable. Your current and new accountable must approve this change.</Text>
                    <Select
                        style={{width: '400px'}}
                        input={newRole}
                        placeholder='Select your new role'
                        options={roleOptions}
                    />
                    <Select 
                        style={{width: '400px'}}
                        input={newAccountable}
                        placeholder={newRole.isValid? 'Select your new accountable' : 'Select a new role first'}
                        options={props.accountableOptions}
                        disabled={!newRole.isValid}
                    />
                    <Text style={{margin: '1rem 0'}} color='grey'>{newRole.value? roles[newRole.value].description : ''}</Text>
                    <Button 
                        icon='send' 
                        iconWeight={300} 
                        color='green' 
                        disabled={!newAccountable.isValid}
                        onClick={handleOnSendRequest}
                        awaiting={props.awaitingResponse}
                    >Send Request</Button>
                </>
            }            
        </SettingSection>
     );
}

export default RoleChange;