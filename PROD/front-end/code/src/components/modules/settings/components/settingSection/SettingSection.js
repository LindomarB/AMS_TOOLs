import React from "react";
import Header from "../../../../Interface/header/Header";
import style from './SettingSection.module.css';

function SettingSection(props) {
    return (
        <section className={`${style.SettingSection} ${props.className || ''}`} style={props.style || {}}>
            {props.title && 
                <Header text={props.title}/>
            }
            <div className={`${style.childrenContainer} ${props.childrenContainerClassName || ''}`} style={props.childrenContainerStyle || {}}>
                {props.children}
            </div>
        </section>
    );
}

export default SettingSection;