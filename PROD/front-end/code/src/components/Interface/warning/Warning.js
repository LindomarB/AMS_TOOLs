import React from 'react';
import Icon from '../icons/icon/Icon';
import Text from '../Text/Text';
import ReportData from '../report/reportData/ReportData';
import style from './Warning.module.css';

function Warning(props) {
    const icons = {
        low: {
            name: 'alert',
            color: 'blue',
            filled: true,
            weight: 500,
            title: 'Be Aware'
        },
        medium: {
            name: 'warning',
            color: 'yellow',
            type: 'rounded',
            filled: true,
            iconStyle: {transform: 'translateY(-0.05rem)'},
            title: 'Attention'
        },
        high: {
            name: 'error',
            color: 'red',
            filled: true,
            weight: 500,
            title: 'Warning'
        }
    }

    const title = props.title
        ? typeof props.title === 'string' ? props.title : icons[props.level].title
        : null;
    
    const textColor = !props.color
        ? props.filled? 'black' : 'grey'
        : props.color;

    const iconProps = {
        ...icons[props.level] || {},
        ...props.iconProps,
        ...props.filled? {borderClassName: style.iconBackground} : {}
    };
    
    const propsClasses = `${props.className || ''} ${props.filled? style.filled : ''} ${props.border? `${style.border} ${style[props.level]}` : ''}`;

    if(props.header) {
        return (
            <div className={`${style.Warning} ${propsClasses}`} style={props.style || {}}>
                <div className={style.header}>
                    <Icon weight={400} {...iconProps}/>
                    <Text  weight={600} size={16} {...props.headerText || {}}>{title}</Text>
                </div>
                {typeof props.children === 'string'
                    ? <Text color={props.filled? 'black' : 'grey'} weight={500}>{props.children}</Text>
                    : props.children}
            </div>
        );
    }

    return (
        <ReportData
            className={`${propsClasses} ${props.centralizeIcon? style.centralizeIcon : ''}`}
            titleClassName={`${style.title} ${props.titleClassName || ''}`}
            titleProps={{
                color: 'black',
                weight: 700
            }}
            title={title}
            valueProps={{
                weight: 500,
                color: textColor
            }}
            iconProps={iconProps}
            value={props.children}
        />
    );
}

Warning.defaultProps = {
    level: 'medium'
};

export default Warning;