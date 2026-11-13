import React from 'react';
import SelectUser from '../../../../../../Interface/modal/appModals/selectUser/SelectUser';

function AccountableChange(props) {
    const handleOnChange = async (selectedAccountable) => {
        const res = await props.onChange(props.accountable, selectedAccountable);

        if(res.ok) {
            props.onClose();
        }
    }

    return (
        <SelectUser
            useServerData={{
                fetcher: {
                    method: 'getAccountableOptions'
                }
            }}
            query={{
                'profile.role': props.accountable.role
            }}
            modal={{
                title: 'Accountable change',
                titleIcon: {
                    name: 'accountable change',
                    filled: true
                },
                subtitle: `Request an accountable change if you are changing teams`,
                warning: 'Changing your accountable may result in you losing some of your access.\nIn addition, your accountables will be reviewed and some may also be changed or removed.',
                onClose: props.onClose
            }}
            input={{
                label: 'Select your new accountable',
                placeholder: 'Search accountable (name, e-mail or ID)'
            }}
            button={{
                text: 'Change Accountable',
                icon: 'change'
            }}
            onConfirm={handleOnChange}
        />
    );
}

AccountableChange.defaultProps = {
    disableBackdropClose: true
};

export default AccountableChange;