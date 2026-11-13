import React, { useRef } from 'react';
import PopBox from '../../../popBox/PopBox';
import Button from '../../button/Button';
import PopBoxButton from '../PopBoxButton';
import style from './ConfirmationPopBox.module.css';

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

function ConfirmationPopBox(props) {
    const popBox = useRef();

    const handleOnClickYes = () => {
        props.onClickYes();
        popBox.current.setShow(false);
    }

    const handleOnClickNo = () => {
        props.onClickNo && props.onClickNo();
        popBox.current.setShow(false);
    }

    return (
        <PopBox
            className={style.ConfirmationPopBox}
            ref={popBox}
            button={{
                className: `${style.popBox} ${props.hoverColor? style[props.hoverColor] : ''} ${props.buttonClassName || ''}`,
                iconClassName: `${style.popBoxIcon} ${props.iconClassName || ''}`,
                textClassName: `${style.popBoxText} ${props.textClassName || ''}`,
                icon: props.icon,
                iconPosition: props.iconPosition || 'right',
                text: props.text
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
                icon='done'
                buttonStyle='menu'
                onClick={handleOnClickYes}
            >Yes</Button>
            <Button
                className={`${style.button} ${style.buttonNo}`}
                textClassName={style.buttonText}
                icon='close'
                buttonStyle='menu'
                onClick={handleOnClickNo}
            >No</Button>
        </PopBox>
    );
}

export default ConfirmationPopBox;