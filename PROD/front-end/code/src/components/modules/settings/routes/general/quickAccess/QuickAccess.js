import React, { useContext } from "react";
import modules from "../../../../../../data/app/modules";
import LIQuickAccess from "../../../../../Interface/listItems/liQuickAccess/LIQuickAccess";
import AppContext from "../../../../../context/appContext/AppContext";
import UserContext from "../../../../../context/userContext/UserContext";
import useInput from "../../../../../hooks/useInput";
import Select from "../../../../../Interface/inputs/select/Select";
import Button from "../../../../../Interface/buttons/button/Button";
import List from "../../../../../Interface/list/List";
import Text from "../../../../../Interface/Text/Text";
import SettingSection from "../../../components/settingSection/SettingSection";
import InputButton from "../../../../../Interface/containers/inputButton/InputButton";

function QuickAccess(props) {
    const quickAccess = useInput({name: 'quickAccess', required: true});
    const lang = useContext(AppContext).currentLanguage;
    const userAccesses = useContext(UserContext).user.accesses;

    const quickAccessOptions = userAccesses.map(access => ({
        value: access,
        label: modules(access).label[lang]
    }));

    const userSettingsQuickAccess = ['notification center', 'cti tool', 'team manager'];

    const listItems = userSettingsQuickAccess.map(module => <LIQuickAccess key={module} module={module}/>);

    return (
        <SettingSection title='Quick Access'>
            <Text color='grey'>Select the quick accesses that will be displayed on the home page.</Text>
            <InputButton style={{marginBottom: '1rem'}}>
                <Select 
                    style={{minWidth: '300px'}} 
                    input={quickAccess} 
                    options={quickAccessOptions} 
                    placeholder='Select a tool'
                />
                <Button icon='add' iconSize={20} iconWeight={300} disabled={!quickAccess.isValid}>Add</Button>
            </InputButton>
            <List  style={{alignSelf: 'stretch'}}>
                {listItems}
            </List>
        </SettingSection>
    );
}

export default QuickAccess;