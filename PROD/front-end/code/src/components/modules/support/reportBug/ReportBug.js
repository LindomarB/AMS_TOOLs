import React, { useContext, useState } from "react";
import Select from "../../../Interface/inputs/select/Select";
import useInput from "../../../hooks/useInput";
import TextInput from "../../../Interface/inputs/textInput/TextInput";
import Button from "../../../Interface/buttons/button/Button";
import SupportForm from "../supportForm/SupportForm";
import Text from "../../../Interface/Text/Text";
import ModalContext from "../../../context/modalContext/ModalContext";
import OpeningDeveloperTools from "./openingDeveloperTools/OpeningDeveloperTools";
import AttachFile from "../../../Interface/inputs/attachFile/AttachFile";
import FetcherContext from "../../../context/fetcherContext/FetcherContext";
import SuccessfulMessage from "../supportForm/successfulMessage/SuccessfulMessage";
import style from './ReportBug.module.css';

function ReportBug(props) {
    const [messageSent, setMessageSent] = useState();
    const fetcher = useContext(FetcherContext);
    const modalCtx = useContext(ModalContext);

    const impact = useInput({
        name: 'impact',
        required: true
    });

    const message = useInput({
        name: 'message',
        required: true
    });

    const files = useInput({
        name: 'files'
    });

    const sendMessage = async () => {
        const formData = new FormData();

        formData.append('type', 'bug report');
        formData.append('impact', impact.value);
        formData.append('message', message.value);

        if(files.value) {
            for(let file of files.value) {
                formData.append('images', file);
            }
        }

        const res = await fetcher.newSupportMessage(
            formData,
            {showSuccessfulNotification: false}
        );

        setMessageSent(res.ok);
        
        if(res.ok) {
            setTimeout(() => {
                impact.reset();
                message.reset();
                setMessageSent(false);
            }, 3000);
        }
    }

    const handleDeveloperToolsHelp = () => {
        modalCtx.show(<OpeningDeveloperTools />);
    }

    const impactOptions = [
        {
            label: `Low - Does not affect my work, but is good to resolve`,
            value: 'low'
        },
        {
            label: 'Medium - I found an error in a process that may produce erroneous data',
            value: 'medium'
        },
        {
            label: 'High - In a specific situation, a feature is not working',
            value: 'high'
        },
        {
            label: 'Critical - I am not being able to use a feature',
            value: 'critical'
        }
    ];

    return (
        <SupportForm
            image={'/images/banners/report-a-bug.svg'}
            imageGradient='#48440540, #48440540'
            header={!messageSent && 'Report a Bug'}
            headerIcon='bug'
            title={!messageSent && `Are unexpected things happeing to you? Report us this bug!`}
        >
            {messageSent &&
                <SuccessfulMessage />
            }
            {!messageSent && 
                <>
                    <Select 
                        input={impact}
                        label='What is the bug impact?'
                        placeholder='Select an impact'
                        options={impactOptions}
                    />
                    {impact.value && 
                        <>
                            <Text className={style.label}>
                                Please describe the problem. It will help us a lot if you also attach an image of the browser developer tools console (
                                <Button
                                    type='text'
                                    color='blue'
                                    onClick={handleDeveloperToolsHelp}
                                >
                                    click here to see how to open it
                                </Button>
                                ).
                            </Text>
                            <TextInput 
                                className={style.textArea}
                                labelClassName={style.inputLabel}
                                type='area'
                                input={message}
                                placeholder='What is the problem you found?'
                            />
                            <AttachFile 
                                input={files}
                                label='Attach an image to help us identify the problem '
                                accept='.jpg, .jpeg, .png'
                                maxSize='5 mb'
                                multiple
                            />
                            <Button
                                className={style.button}
                                color='orange'
                                icon='bug'
                                highlight
                                disabled={!message.isValid || !impact.isValid}
                                awaiting={fetcher.awaiting.newSupportMessage}
                                onClick={sendMessage}
                            >
                                Report Bug
                            </Button>
                        </>
                    }
                </>
            }
        </SupportForm>
    );
}

export default ReportBug;