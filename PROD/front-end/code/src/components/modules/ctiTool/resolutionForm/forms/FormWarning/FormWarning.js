import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../../../../../../data/app/modules';
import ModalContext from '../../../../../context/modalContext/ModalContext';
import Text from '../../../../../Interface/Text/Text';
import Button from '../../../../../Interface/buttons/button/Button';
import ResumeProgressConfirmation from '../modals/resumeProgressConfirmation';
import style from './FormWarning.module.css';

function FormWarning(props) {
    const modalCtx = useContext(ModalContext);
    const navigate = useNavigate();

    if(props.type === 'userHasResolutionInProgress') {
        const handleOnResumeResolutionInProgress = () => {
            const onResume = () => {
                navigate(`${modules('cti tool', 'create resolution').getRoute('new resolution').path}?progress=${props.resolution._id}`);
                modalCtx.close();
            }
    
            modalCtx.show(
                <ResumeProgressConfirmation 
                    onResume={onResume}
                />
            );
        }

        return (
            <Text className={style.FormWarning} span color='grey'>
                You already have a resolution in progress for incident {props.resolution.incident.incident}. When finalizing this new resolution, it will be cancelled.<br/>
                If you wish to continue the resolution in progress, 
                <Button 
                    className={style.textButton} 
                    type='text' 
                    color='blue'
                    onClick={handleOnResumeResolutionInProgress}
                >
                    click here
                </Button>
                .
            </Text>
        );
    }

    if(props.type === 'anotherUserHasResolutionInProgress') {
        return (
            <Text className={style.FormWarning} span color='grey'>
                Another user is also creating a resolution for incident {props.resolution.incident.incident}. Only the first completed resolution will be considered.
            </Text>
        );
    }

    if(props.type === 'decommissioned') {
        return (
            <Text className={style.FormWarning} span color='grey'>
                The application {props.application} has been decommissioned. Be sure you want to create a resolution for it.
            </Text>
        );
    }
}

export default FormWarning;