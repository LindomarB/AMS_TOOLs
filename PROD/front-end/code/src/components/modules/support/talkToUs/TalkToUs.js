import React, { useContext, useState } from "react";
import Select from "../../../Interface/inputs/select/Select";
import useInput from "../../../hooks/useInput";
import TextInput from "../../../Interface/inputs/textInput/TextInput";
import Button from "../../../Interface/buttons/button/Button";
import SupportForm from "../supportForm/SupportForm";
import AttachFile from "../../../Interface/inputs/attachFile/AttachFile";
import FetcherContext from "../../../context/fetcherContext/FetcherContext";
import SuccessfulMessage from "../supportForm/successfulMessage/SuccessfulMessage";
import style from './TalkToUs.module.css';

function TalkToUs(props) {
    const [messageSent, setMessageSent] = useState();
    const fetcher = useContext(FetcherContext);

    const subject = useInput({
        name: 'subject',
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

        formData.append('type', 'talk to us');
        formData.append('subject', subject.value);
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
                subject.reset();
                message.reset();
                setMessageSent(false);
            }, 3000);
        }
    }

    const subjectOptions = [
        {
            label: 'I need help',
            value: 'help'
        },
        {
            label: 'I have a suggestion',
            value: 'suggestion'
        },
        {
            label: 'I need a new feature',
            value: 'new feature'
        }
    ];

    const descriptions = {
        help: `If you're having problems and you can't find a solution in our guide or FAQ, just ask us!`,
        'new feature': `Tell us what feature you need.`,
        suggestion: `Did you have an idea how to improve something? Tell us!`
    };

    return (
        <SupportForm
            image={'/images/banners/talk-to-us.svg'}
            imageGradient='#08246140, #08246140'
            header={!messageSent && 'Talk To Us'}
            headerIcon='talk to us'
            title={!messageSent && `Didn’t find what you need here? Got suggestions? Contact us!`}
        >
            {messageSent &&
                <SuccessfulMessage />
            }
            {!messageSent && 
                <>
                    <Select 
                        input={subject}
                        label='About what do you want to talk with us?'
                        placeholder='Select a subject'
                        options={subjectOptions}
                    />
                    {subject.value && 
                        <>
                            <TextInput 
                                className={style.textArea}
                                labelClassName={style.inputLabel}
                                type='area'
                                input={message}
                                label={descriptions[subject.value]}
                                placeholder='Type your message'
                            />
                            <AttachFile 
                                input={files}
                                label='You can attach an image with your message'
                                accept='.jpg, .jpeg, .png'
                                maxSize='5 mb'
                                multiple
                            />
                            <Button
                                className={style.button}
                                color='green'
                                icon='send'
                                highlight
                                disabled={!message.isValid || !subject.isValid}
                                awaiting={fetcher.awaiting.newSupportMessage}
                                onClick={sendMessage}
                            >
                                Send Message
                            </Button>
                        </>
                    }
                </>
            }
        </SupportForm>
    );
}

export default TalkToUs;