import React from 'react';
import roles from '../../../../../../../data/app/roles';
import Text from '../../../../../../Interface/Text/Text';
import SettingSection from '../../../../components/settingSection/SettingSection';

function RoleInfo(props) {
    return (
        <SettingSection title={props.role}>
            <Text color='grey'>{roles[props.role].description}</Text>
        </SettingSection>
    );
}

export default RoleInfo;