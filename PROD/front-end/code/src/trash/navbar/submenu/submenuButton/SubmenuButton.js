import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './SubmenuButton.module.css';

function SubmenuButton(props) {
    const activeLink = ({isActive}) => {
        return `${style.SubmenuButton} ${isActive? style.active : ''}`
    };

    return (
        <NavLink className={activeLink} to={props.path} end onClick={props.onClick || null}>
            {props.children}
            {props.notification &&
                <div className={style.notification}></div>
            }
        </NavLink>
    )
}

export default SubmenuButton;