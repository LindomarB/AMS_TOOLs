import React, { useContext, useState } from "react";
import Select from "../../../../Interface/inputs/select/Select";
import Text from "../../../../Interface/Text/Text";
import TextInput from "../../../../Interface/inputs/textInput/TextInput";
import Modal from "../../../../Interface/modal/Modal";
import useInput from "../../../../hooks/useInput";
import Button from "../../../../Interface/buttons/button/Button";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import SuccessfulMessage from "../../supportForm/successfulMessage/SuccessfulMessage";
import style from './AskQuestion.module.css';

function AskQuestion(props) {
    const [messageSent, setMessageSent] = useState();
    const fetcher = useContext(FetcherContext);

    const subject = useInput({
        name: 'subject',
        required: true
    });

    const newSubject = useInput({
        name: 'newSubject',
        required: subject.value === 'New subject'
    });

    const question = useInput({
        name: 'question',
        required: true
    });

    const sendNewFaq = async () => {
        const res = await fetcher.newSupportMessage({
            type: 'new faq',
            subject: newSubject.value || subject.value,
            message: question.value
        },
        {
            showSuccessfulNotification: false
        });

        setMessageSent(res.ok);
        
        if(res.ok) {
            setTimeout(props.onClose, 3000);
        }
    }

    const subjectOptions = [
        'New subject',
        ...props.subjects
    ];

    return (
        <Modal
            className={style.AskQuestion}
            title='Ask a question'
            titleIcon={{name: 'support'}}
            subtitle='Send us a question to be added to our FAQ'
            onClose={props.onClose}
        >
            {messageSent &&
                <SuccessfulMessage />
            }
            {!messageSent &&
                <>
                    <Text color='grey'>
                        If you haven’t found the answer to your question, we will help you.<br/>
                        Feel free to send it in English, Portuguese or Spanish.
                    </Text>
                    <Select 
                        input={subject}
                        options={subjectOptions}
                        placeholder='Select a subject'
                    />
                    {subject.value === 'New subject' &&
                        <TextInput
                            input={newSubject}
                            placeholder='New subject'
                        />
                    }
                    <TextInput 
                        className={style.textArea}
                        type='area'
                        input={question}
                        placeholder='Type your question'
                    />
                    <Button
                        style={{marginTop: '2rem'}}
                        color='green'
                        icon='send'
                        disabled={!subject.isValid || !newSubject.isValid || !question.isValid}
                        awaiting={fetcher.awaiting.newSupportMessage}
                        onClick={sendNewFaq}
                    >
                        Send Question
                    </Button>
                </>
            }
        </Modal>
    );
}

AskQuestion.defaultProps = {
    disableBackdropClose: true
}

export default AskQuestion;