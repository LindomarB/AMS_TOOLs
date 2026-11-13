import React from 'react';
import style from './ReportSection.module.css';

function ReportSection(props) {
    return (
        <div className={style.ReportSection}>
            <p className={style.title}>{props.title}</p>
            {props.children}
        </div>
    );
}

export default ReportSection;