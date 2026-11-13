import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../buttons/button/Button';
import style from './IconNavbar.module.css';
import Rule from '../../rule/Rule';

function IconNavbar(props) {
    const buttons = props.buttons.map((item, idx) => {
        if(item.rule) {
            return (
                <Rule 
                    key={`icon-navbar-rule-${idx}`}
                    className={`${style.rule} ${props.ruleClassName || ''}`}
                    color={props.ruleColor || props.color || 'theme'}
                    vertical={!props.vertical}
                />
            );
        }

        const key = `icon-navbar-item-${item.icon || item.tooltip || idx}`;

        if(item.$$typeof) {
            return (
                <item.type key={key} {...item.props}/>
            );
        }

        const buttonClassName = `${style.button} ${item.className || props.buttonClassName || ''}`;
        const activeClassName = item.activeClassName || props.activeClassName || style.active;
        const alertClassName = item.alertClassName || props.alertClassName;
        const buttonProps = {
            type: 'icon',
            color: props.color,
            iconProps: {...props.iconProps || {}, ...item.iconProps || {}},
            alertOverIcon: true,
            ...item,
            className: buttonClassName,
            alertClassName
        };

        if(item.path) {
            const itemClassName = ({isActive}) => `${style.navlink} ${isActive? activeClassName : ''} ${props.linkClassName || ''}`;

            return (
                <NavLink key={key} className={itemClassName} to={item.path} end={item.end}>
                    {({isActive}) => (
                        <Button
                            {...buttonProps}
                            active={isActive}
                        />
                    )}
                </NavLink>
            );
        } else {
            return (
                <Button
                    {...buttonProps}
                    activeClassName={activeClassName}
                    key={key}
                />
            );
        }
    });
    
    return (
        <nav className={`${style.IconNavbar} ${props.vertical? style.vertical : ''} ${props.className || ''}`}>
            {buttons}
        </nav>
    );
}

export default IconNavbar;