import React from "react";
import Modal from "../../../Interface/modal/Modal";
import RadioButton from "../../../Interface/inputs/radioButton/RadioButton";
import useInput from "../../../hooks/useInput";
import Button from "../../../Interface/buttons/button/Button";

function SelectGuideLanguage(props) {
    const language = useInput({
        name: 'language',
        required: true
    });

    const options = [
        {
            label: 'English',
            value: 'en'
        },
        {
            label: 'Portuguese',
            value: 'pt'
        }
    ];

    return (
        <Modal
            title='User Guide Download'
            titleIcon={{name: 'guide'}}
            onClose={props.onClose}
        >
            <RadioButton 
                label='Select which language you want to download the user guide in:'
                input={language}
                options={options}
            />
            <Button
                style={{marginTop: '2rem'}}
                color='green'
                icon='download'
                disabled={!language.isValid}
            >
                Download
            </Button>
        </Modal>
    );
}

export default SelectGuideLanguage;