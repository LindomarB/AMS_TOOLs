import React, { useContext, useState } from 'react';
import emailValidation from '../../../../functions/inputValidation/emailValidation';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Interface/buttons/button/Button';
import useInput from '../../../hooks/useInput';
import TextInput from '../../../Interface/inputs/textInput/TextInput';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import Text from '../../../Interface/Text/Text';
import ReportData from '../../../Interface/report/reportData/ReportData';
import style from './ForgotPassword.module.css';
import sortByField from '../../../../functions/array/sortByField';
import Icon from '../../../Interface/icons/icon/Icon';

function ForgotPassword(props) {
    const [response, setResponse] = useState(false);
    const fetcher = useContext(FetcherContext);
    const navigate = useNavigate();

    const email_id = useInput({
        name: 'email_id',
        required: true,
        errorChecker: (value) => {
            if(value.includes('@') || value.includes('.')) {
                const emailIsValid = emailValidation(value, ['@cargill.com', '@crgl-thirdparty.com']);
                return emailIsValid? '' : 'Invalid email';
            }

            return !value && 'Invalid ID';
        }
    });

    const requestPasswordReset = async () => {
        const res = await fetcher.requestPasswordReset({user: email_id.value});
        setResponse(res.ok && res.data);
    }

    const accountables = response && (
        <ReportData value={sortByField(response.accountables, 'name').map(accountable => ({
            title: accountable.name,
            value: accountable.email
        }))}/>
    );

    return (
        <div className={style.ForgotPassword}>
            <Text size={24} align='center'>Forgot your password?</Text>
            {!response && 
                <>
                    <Text color='grey'>
                        If you forgot your password, notify your accountables. They will request the reset and send you an email with the link to set your new password.
                    </Text>
                    <TextInput
                        input={email_id}
                        label='Email or ID'
                        placeholder='email@cargill.com | ID000123'
                        onPressEnter={requestPasswordReset}
                    />
                    <Button
                        color='blue'
                        onClick={requestPasswordReset}
                        disabled={!email_id.isValid}
                        awaiting={false}
                    >
                        Notify My Accountables
                    </Button>
                    <Text align='center'>or</Text>
                    <Button
                        color='blue'
                        type='text'
                        onClick={() => navigate('/portal')}
                    >
                        Back to Sign In
                    </Button>
                </>
            }
            {response &&
                <>
                    {response.accountablesNotified &&
                        <>
                            <Icon style={{alignSelf: 'center'}} name='check_circle' filled color='green' size={56} weight={400}/>
                            <Text size={20} weight={500} align='center'>Your accountables were notified!</Text>
                            <Text color='grey'>
                                They have 72 hours to request your password reset.<br/>
                                Keep an eye on your email box. You will shortly receive a link to set a new password.
                            </Text>
                        </>
                    }
                    {response.resetAlreadyRequested &&
                        <>
                            <Icon style={{alignSelf: 'center'}} name='stacked_email' filled color='blue' size={56} weight={400} border invertColor padding={24}/>
                            <Text size={20} weight={500} align='center'>Check your email</Text>
                            <Text color='grey'>
                                The password reset has already been requested by one of your accountables and a link was sent to your email.
                            </Text>
                        </>
                    }
                    <Text color='grey'>If you need, you can contact them:</Text>
                    {accountables}
                    <Button
                        className={style.button}
                        color='blue'
                        onClick={() => navigate('/portal')}
                    >
                        Back to Sign In
                    </Button>
                </>
            }
        </div>
    );
}

export default ForgotPassword;