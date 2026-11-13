import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../icons/icon/Icon';
import Tooltip from '../../tooltip/Tooltip';
import Processing from '../../loaders/processing/Processing';
import Alert from './alert/Alert';
import style from './Button.module.css';
import defaultStyle from './ButtonDefault.module.css'
import iconStyle from './ButtonIconStyle.module.css'
import menuStyle from './ButtonMenuStyle.module.css'
import textStyle from './ButtonTextStyle.module.css'
import colors from '../../../generalStyles/colors.module.css';

/*
    COMPONENT PROPS

    children (optional): the text to be displayed. If not passed, the class iconButton will be applied, and can be overwritten by the iconButtonClassName prop.
    path (optional): if a path is passed, the button is wrapper in a Link component. The onClick function still working.
    onClick (required): a function to be triggered when the button is clicked.
    onMouseEnter (optional): a function to be triggered when the mouse enter the button.
    tooltip (optional): a content to be showed in the tooltip.
    tooltipProps(optional): the tooltip props.
    type (optional): applies a pre-defined button style (icon, menu or text).
    icon (optional): the icon name.
    iconPosition (optional): the icon position relative to the text.
    color (optional): applies a pre-defined color to the button. The default color is the theme color (green, red, blue).
    active (optional): hold the button in the active style.
    disabled (optional): disable the button.
    disableText (optional): hide the text.
    waiting (optional): If true, disable the button and display the Processing loader inside.
    id (optional): the element id if it is needed to be found in DOM.
    getRef (optiona): a function that will receive the button ref;
    className (optional): the CSS class to be applied in the main component
    activeClassName (optional): the CSS class to be applied if the button has the prop active equal to true.
    style (optional): a style object to be applied on the button.
    iconClassName (optional): the CSS class to be applied on the icon.
    iconButtonClassName (optional): the CSS class to be applied on the button instead of the default iconButton class.
*/

function Button(props) {
    const buttonRef = useRef();

    useEffect(() => {
        if(buttonRef.current && props.getRef) {
            props.getRef(buttonRef.current);
        }
    }, [buttonRef.current]);

    const handleOnClick = (event) => {
        if(props.onClick) props.onClick(event);
    }

    const iconProps = {
        className: `${style.icon}`, 
        style: props.iconStyle,
        name: props.icon, 
        size: props.iconSize, 
        weight: props.iconWeight,
        color: props.iconColor,
        ...props.iconProps || {},
        ...props.active? props.activeIconProps : {}
    }

    const color = props.color || 'theme';
    const buttonClassName = [style.Button];

    const buttonStyle = {...props.style || {}};
    let buttonType = null;
    let iconOnly = null;

    switch(props.type) {
        case 'icon':
            buttonType = iconStyle;
            iconProps.className = `${style.icon}`;

            if(!iconProps.size) {
                iconProps.size = 24;
            }

            // const size = (iconProps.size / 16);
            // buttonStyle.width = `${size}rem`;
            // buttonStyle.height = `${size}rem`;
            buttonClassName.push(colors[color]);
            break;
        case 'menu':
            buttonType = menuStyle;
            buttonClassName.push(colors[color]);
            break;
        case 'text':
            buttonType = textStyle;
            buttonClassName.push(colors[props.color? color : 'grey']);
            break;
        default:
            buttonType = defaultStyle;
            iconProps.className = `${style.icon} ${buttonType.icon}`;

            if(!props.children) {
                iconOnly = true;

                if(!iconProps.weight) {
                    iconProps.weight = 300;
                }
            }
            buttonClassName.push(colors[color]);
    }

    buttonClassName.push(buttonType.style);

    iconOnly && buttonClassName.push(buttonType.iconOnly);
    props.iconPosition && buttonClassName.push(style[props.iconPosition]);
    props.highlight && buttonClassName.push(style.highlight, buttonType.highlight);
    props.highlightDisabled && buttonClassName.push(style.highlightDisabled, buttonType.highlightDisabled);
    props.className && buttonClassName.push(props.className);
    props.awaiting && buttonClassName.push(style.awaiting);
    props.path && buttonClassName.push(style.insideLink);

    const iconWrapperStyle = {
        width: `${(iconProps.size || 16)/ 16}rem`,
        height: `${(iconProps.size || 16)/ 16}rem`
    }

    if(props.active) {
        buttonClassName.push(style.active);

        props.activeClassName
            ? buttonClassName.push(props.activeClassName)
            : buttonClassName.push(buttonType.active);
    }

    let button = (
        <Tooltip
            className={props.tooltipClassName}
            content={props.tooltip}
            disabled={!props.tooltip && !props.tooltipProps}
            position={props.tooltipPosition}
            hideDelay={0}
            hideOnClick={props.hideTooltipOnClick ?? true}
            {...props.tooltipProps || {}}
        >
            <button
                ref={buttonRef}
                className={buttonClassName.join(' ')} 
                style={buttonStyle}
                onClick={handleOnClick} 
                onMouseEnter={props.onMouseEnter || null}
                onMouseLeave={props.onMouseLeave || null}
                disabled={props.awaiting || props.disabled}
                label={props.children || props.text}
            >
                {props.awaiting &&
                    <Processing className={`${style.Processing} ${style.child} ${buttonType.child}`}/>
                }
                {(props.icon || props.iconProps) && 
                <div className={`${style.iconWrapper} ${style.child} ${buttonType.child}`} style={iconWrapperStyle}>
                    {props.iconFilled
                        ? <Icon {...iconProps} className={`${iconProps.className}`} filled/>
                        : <>
                            <Icon {...iconProps} className={`${iconProps.className} ${style.outlined}`}/>
                            <Icon {...iconProps} className={`${iconProps.className} ${style.filled}`} filled/>
                        </>
                    }
                    {(!!props.alert && props.alertOverIcon) &&
                        <Alert className={props.alertClassName} max={props.alertMax}>
                            {props.alert}
                        </Alert>
                    }
                </div>
                }
                {props.type === 'text'
                    ? (
                        <span className={buttonType.textWrapper}>
                            <span 
                                className={`${style.text} ${style.child} ${buttonType.text || ''} ${props.textClassName || ''}`}
                                label={props.children || props.text}
                            >{props.children || props.text}</span>
                        </span>
                    )
                    : (!props.disableText && (props.children || props.text)) &&
                        <span 
                            className={`${style.text} ${style.child} ${buttonType.child || ''} ${props.textClassName || ''}`}
                        >{props.children || props.text}</span>
                }
                {/* {(!props.disableText && (props.children || props.text)) && props.type === 'text'
                    ? (
                        <span className={buttonType.textWrapper}>
                            <span 
                                className={`${style.text} ${style.child} ${buttonType.child || ''} ${props.textClassName || ''}`}
                            >{props.children || props.text}</span>
                        </span>
                    )
                    : (
                        <span 
                            className={`${style.text} ${style.child} ${buttonType.child || ''} ${props.textClassName || ''}`}
                        >{props.children || props.text}</span>
                    )
                    
                } */}
                {(!!props.alert && !props.alertOverIcon) &&
                    <Alert className={props.alertClassName} max={props.alertMax}>
                        {props.alert}
                    </Alert>
                }
            </button>
        </Tooltip>
    );
    
    if(props.path) {
        button = (
            <Link to={props.path} end={props.end}>
                {button}
            </Link>    
        );    
    }

    // if(props.alert) {
    //     return (
    //         <div className={style.alertWrapper}>
    //             <div className={`${style.alert} ${props.alertClassName || ''}`}>{
    //                 typeof props.alert === 'number'
    //                     ? <Text className={style.number} span size={props.alert > 9? 8 : 10}>{props.alert > 99? 99 : props.alert}</Text>
    //                     : <Icon name='exclamation' filled size={14} weight={500}/>
    //             }</div>
    //             {button}
    //         </div>    
    //     );
    // }

    return button;
}

Button.defaultProps = {
    // color: 'theme',
    textSize: 14
};

export default Button;