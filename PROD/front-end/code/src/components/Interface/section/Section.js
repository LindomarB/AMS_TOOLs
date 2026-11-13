import React from 'react';
import Header from '../header/Header';
import style from './Section.module.css';

function Section(props) {
    return (
        <div className={`${style.Section} ${props.className || ''}`}>
            <Header {...props} className={props.headerClassName} text={props.title}>
                {props.headerChildren}
            </Header>
            {props.children}
        </div>
    );
}

export default Section;