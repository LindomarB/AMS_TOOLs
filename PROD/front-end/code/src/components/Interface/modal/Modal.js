import React from 'react';
import Button from '../buttons/button/Button';
import Card from '../card/Card';
import Icon from '../icons/icon/Icon';
import Text from '../Text/Text';
import style from './Modal.module.css';
import Warning from '../warning/Warning';
import Rule from '../rule/Rule';

/*
    COMPONENT PROPS

    title (optional): the modal title.
    titleIcon (optional): an object to configure an Icon component, that is displayed in front of the title.
    subtitle (optional): the modal subtitle.
    children (requeired): the modal main content.
    warning (optional): a warning to be displayed at the of of modal.
    warningIcon (optional): an object to configure an Icon component, that is displayed in front of the warning.
    warningLevel (optional): the warning level.
    onClose (required): a function to be triggered when the closed button is clicked.
*/

function Modal(props) {
    const handleOnClickContent = (event) => {
        event.stopPropagation();
    }

    const handleOnClose = () => {
        props.onClose();
        
    }
    return (
        <Card className={`${style.Modal} ${props.className || ''}`} style={props.style || {}} onClick={handleOnClickContent} shadow>
            <div className={style.header}>
                <div className={style.titleContainer}>
                    <div className={style.titleWrapper}>
                        {props.titleIcon &&
                            <Icon size={24} weight={300} {...props.titleIcon} className={`${style.titleIcon} ${props.titleIcon.className || ''}`}/>
                        }
                        <Text size={14} weight={600}>{props.title}</Text>
                    </div>
                    <Button type='icon' icon='close' color='grey' onClick={handleOnClose}/>
                </div>
                {props.subtitle &&
                    <Text size={12} weight={600} color='grey'>{props.subtitle}</Text>
                }
            </div>
            {props.children}
            {props.warning &&
                <>
                <Rule/>
                    <Warning title level={props.warningLevel} iconProps={props.warningIcon} {...props.warningProps || {}}>
                        {props.warning}
                    </Warning>
                </>
            }
        </Card>
    );
}

export default Modal;