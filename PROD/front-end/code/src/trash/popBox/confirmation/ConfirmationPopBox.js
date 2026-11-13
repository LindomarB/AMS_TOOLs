import React, { useContext, useRef } from 'react';
import AppContext from '../../../components/context/appContext/AppContext';
import Button from '../../../components/Interface/buttons/button/Button';
import PopBoxButton from '../../../components/Interface/buttons/popBoxButton/PopBoxButton';
import style from './ConfirmationPopBox.module.css';

function ConfirmationPopBox(props) {
    const appCtx = useContext(AppContext);
    const popBoxButton = useRef();

    const icons = appCtx.icons

    const handleOnClickYes = () => {
        props.onClickYes();
        popBoxButton.current.setShow(false);
    }

    const handleOnClickNo = () => {
        props.onClickNo && props.onClickNo();
        popBoxButton.current.setShow(false);
    }

    return (
        <PopBoxButton
            className={style.ConfirmationPopBox}
            ref={popBoxButton}
            button={{
                className: `${style.popBoxButton} ${props.buttonClassName || ''}`,
                iconClassName: `${style.popBoxButtonIcon} ${props.iconClassName || ''}`,
                textClassName: `${style.popBoxButtonText} ${props.textClassName || ''}`,
                icon: icons[props.icon],
                iconPosition: props.iconPosition || 'right',
                label: props.label || icons[props.icon].label
            }}
            popBox={{
                className: style.popBox,
                horizontalAlign: 'right'
            }}
        >
            <p className={style.question}>{props.question}</p>
            <Button
                className={`${style.button} ${style.buttonYes}`}
                iconClassName={style.icon}
                textClassName={style.buttonText}
                icon={icons.done}
                onClick={handleOnClickYes}
            >Yes</Button>
            <Button
                className={`${style.button} ${style.buttonNo}`}
                textClassName={style.buttonText}
                icon={icons.close}
                onClick={handleOnClickNo}
            >Yes</Button>
        </PopBoxButton>
    );
}

export default ConfirmationPopBox;