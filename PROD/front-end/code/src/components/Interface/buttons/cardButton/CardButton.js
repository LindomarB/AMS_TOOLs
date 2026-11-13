import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../icons/icon/Icon';
import Text from '../../Text/Text';
import Card from '../../card/Card';
import colors from '../../../generalStyles/colors.module.css';
import style from './CardButton.module.css';

/*
    COMPONENT PROPS

    children (optional): the text to be displayed. If not passed, the class iconButton will be applied, and can be overwritten by the iconButtonClassName prop.
    label
    description
    path (optional): if a path is passed, the button is wrapper in a Link component. The onClick function still working.
    onClick (required): a function to be triggered when the button is clicked.
    onMouseEnter (optional): a function to be triggered when the mouse enter the button.
    icon (optional): the icon name.
    iconPosition (optional): the icon position relative to the text.
    color (optional): applies a pre-defined color to the button. The default color is the theme color (green, red, blue).
    active (optional): hold the button in the active style.
    disabled (optional): disable the button.
    className (optional): the CSS class to be applied in the main component
    style (optional): a style object to be applied on the button.
    iconClassName (optional): the CSS class to be applied on the icon.
    iconButtonClassName (optional): the CSS class to be applied on the button instead of the default iconButton class.
*/

function CardButton(props) {
    const handleOnClick = (event) => {
        if(props.onClick) props.onClick(event);
    }

    const iconProps = {
        className: `${style.icon}`, 
        style: props.iconStyle,
        name: props.icon, 
        size: props.iconSize, 
        weight: props.iconWeight,
        type: props.iconType,
        color: props.color
    }

    const button = (
        <button
            className={`${style.button}`} 
            style={props.style}
            onClick={handleOnClick} 
            onMouseEnter={props.onMouseEnter || null}
            onMouseLeave={props.onMouseLeave || null}
            disabled={props.disabled}
        >
            {props.image &&
                <img className={`${style.image} ${props.imageClassName || ''}`} src={props.image}/>
            }
            <div className={style.label}>
                {props.icon && 
                    <div className={style.iconWrapper}>
                        <Icon {...iconProps} className={`${iconProps.className} ${style.outlined}`}/>
                        <Icon {...iconProps} className={`${iconProps.className} ${style.filled}`} filled/>
                    </div>
                }
                <Text className={`${style.labelText} ${props.labelTextClassName || ''}`} size={14} color={props.color} weight={600} >{props.label}</Text>
            </div>
            <Text size={12} color='grey'>{props.description}</Text>
        </button>
    );

    return (
        <Card 
            className={`${style.CardButton} ${colors[props.color]} ${props.active? props.activeClassName || style.active : ''} ${props.className || ''}`}
            shadow
            hoverEffect
        >
            {props.path
                ? <Link className={style.link} to={props.path}>{button}</Link>  
                : button
            }
            {props.children}
            {props.alert &&
                <Icon className={style.alert} name='alert' filled color='red' weight={500}/>
            }
        </Card>
    );    
}

CardButton.defaultProps = {
    color: 'theme',
    iconWeight: 300
}

export default CardButton;