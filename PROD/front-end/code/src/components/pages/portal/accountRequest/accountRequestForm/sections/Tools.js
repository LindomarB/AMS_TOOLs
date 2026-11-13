import React, { useContext, useEffect, useState } from 'react';
import CheckBox from '../../../../../Interface/inputs/checkBox/CheckBox';
import RadioButtonInput from '../../../../../Interface/inputs/radioButton/RadioButton';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import useInput from '../../../../../hooks/useInput';
import Select from '../../../../../Interface/inputs/select/Select';
import Text from '../../../../../Interface/Text/Text';
import capitalize from '../../../../../../functions/text/capitalize';

function Tools(props) {
    const [accountableOptions, setAccountableOptions] = useState([]);
    const [roles, setRoles] = useState();
    const fetcher = useContext(FetcherContext);

    const accesses = useInput({
        name: 'accesses', 
        initialValue: props.values.accesses || []
    });

    useEffect(() => {
        props.setFormSection(props.name, [accesses]);
    }, []);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchAccountableOptions = async () => {
        const res = await fetcher.getAccountableOptionsForNewAccount(
            {
                query: {role: role.value}
            }, 
            {
                errorNotification: 'Failed to get approvers'
            }
        );

        if(!res.ok) role.setValue(null);

        const options = res.data.map(accountable => ({
            label: accountable.name,
            value: accountable._id
        }));

        setAccountableOptions(options);
    }

    if(!roles) return;

    const roleOptions = Object.keys(roles)
        .map(role => ({value: role, label: capitalize(role)}));

    const accessesOptions = [];

    if(role.value) {
        roles[role.value].allowedAccesses.sort().forEach(access => {
            accessesOptions.push({
                value: access, 
                label: capitalize(access)
            })
        });

        roles[role.value].defaultAccesses.sort().forEach(access => {
            accessesOptions.push({
                value: access, 
                label: capitalize(access), 
                disabled: true
            })
        });
    }
 
    return (
        <>
            <RadioButtonInput
                input={role}
                label='What is your role?'
                options={roleOptions}
            />
            {role.value && (role.value === 'administrator' || !!accountableOptions.length) &&
                <>
                    <div>
                        <Text size={16} weight={500} style={{marginBottom: '0.5rem'}}>
                            Role description
                        </Text>
                        <Text color='grey'>
                            {roles[role.value].description}
                        </Text>
                    </div>
                    {role.value === 'administrator'
                        ? (
                            <Text weight={600}>
                                The access request for Administrators must be approved by another Administrator. All Administrators will be notified of your request.
                            </Text>
                        )
                        : (
                            <>
                                <Text size={16} weight={500} style={{marginBottom: '-1rem'}}>
                                    Accountable
                                </Text>
                                <Text color='grey' >
                                    Select who is accountable for your. You will become part of his team and he will be responsible for approving your access. Later you can add other accountables to you.
                                </Text>
                                <Select 
                                    input={accountable}
                                    placeholder='Select your accountable'
                                    options={accountableOptions}
                                    sort
                                />
                            </>
                        )
                    }
                    <CheckBox 
                        input={accesses}
                        label='Select the tools you need access to'
                        options={accessesOptions}
                    />
                </>
            }
        </>
    );
}

Tools.defaultProps = {
    name: 'tools'
}

export default Tools;