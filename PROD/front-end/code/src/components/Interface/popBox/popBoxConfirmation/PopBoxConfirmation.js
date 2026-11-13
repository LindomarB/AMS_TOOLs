import React, { useRef } from 'react';
import Button from '../../buttons/button/Button';
import Text from '../../Text/Text';
import PopBox from '../PopBox';
import style from './PopBoxConfirmation.module.css';
import Warning from '../../warning/Warning';

/*
    COMPONENT PROPS

    icon (optional): the button icon.
    iconPosition (optional): the button icon potision (default is right).
    text (required): the button text.
    hoverColor (optional): a pre defined color to be applied on the button when hovered (red, grenn or blue). 
    question (required): the question in the pop box.
    onClickYes (required): a function to be executed when the option 'yes' was clicked.
    onClickNo (optional): a function to be executed when the option 'no' was clicked.
    buttonClassName (optional): a CSS class to be applied on the button.
    iconClassName (optional): a CSS class to be applied on the icon button.
    textClassName (optional): a CSS class to be applied on the text button.
*/

function PopBoxConfirmation(props) {
    const popBox = useRef();

    const handleOnClickYes = (event) => {
        event.stopPropagation();
        props.onClickYes();
        popBox.current.setShow(false);
    }

    const handleOnClickNo = (event) => {
        event.stopPropagation();
        props.onClickNo && props.onClickNo();
        popBox.current.setShow(false);
    }

    return (
        <PopBox
            ref={popBox}
            className={`${style.popBox} ${props.className || ''}`}
            container={props.container}
            horizontalAlign='right'
            allowRepositioning
            disableButton={props.disableButton}
            button={{
                className: `${props.buttonClassName || ''}`,
                iconClassName: `${style.popBoxIcon} ${props.iconClassName || ''}`,
                textClassName: `${style.popBoxText} ${props.textClassName || ''}`,
                icon: props.icon,
                iconProps: props.iconProps,
                iconPosition: props.iconPosition || 'right',
                text: props.text,
                type: props.type || 'text',
                color: props.hoverColor,
                tooltip: props.tooltip,
                disabled: props.disabled
            }}
        >
            <div className={style.question}>
                <Warning>
                    <Text size={12}>{props.question}</Text>
                </Warning>
            </div>
            {!props.hideButtons &&
                <>
                    <Button
                        className={`${style.button} ${style.buttonYes}`}
                        iconClassName={style.icon}
                        textClassName={style.buttonText}
                        icon='done'
                        type='menu'
                        color='green'
                        onClick={handleOnClickYes}
                    >Yes</Button>
                    <Button
                        className={`${style.button} ${style.buttonNo}`}
                        textClassName={style.buttonText}
                        icon='close'
                        type='menu'
                        color='red'
                        onClick={handleOnClickNo}
                    >No</Button>
                </>
            }
        </PopBox>
    );
}

export default PopBoxConfirmation;