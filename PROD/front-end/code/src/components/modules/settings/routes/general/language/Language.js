import React from "react";
import useInput from "../../../../../hooks/useInput";
import Select from "../../../../../Interface/inputs/select/Select";
import SettingSection from "../../../components/settingSection/SettingSection";

function Language(props) {
    const language = useInput({name: 'language'});

    const langOptions = [
        {value: 'en', label: 'English'},
        // {value: 'es', label: 'Spanish'},
        // {value: 'pt', label: 'Portuguese'}
    ];

    return (
        <SettingSection title='Language'>
            <Select 
                input={language}
                options={langOptions}
                style={{minWidth: '300px'}}
            />
        </SettingSection>
    );
}

export default Language;