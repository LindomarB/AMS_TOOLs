import React from 'react';
import style from './Link.module.css';
import { NavLink } from 'react-router-dom'
import NavbarButton from '../NavbarButton/NavbarButton';

function Link(props) {
    if(props.externalLink) {
        return (
            <a className={style.Link} href={props.path} rel='external' target='_blank' onClick={props.onClick || null}>
                <NavbarButton
                    {...props}
                    onClick={null}
                />
            </a>
        );
    }

    return (
        <NavLink className={style.Link} to={props.path} onClick={props.onClick || null}>
            {({isActive}) =>(
                <NavbarButton
                    {...props}
                    active={isActive}
                    onClick={null}
                />
            )}
        </NavLink>
    );
}

export default Link;