import React from 'react';
import Text from '../../Text/Text';
import style from './ReportDataGrid.module.css';

function ReportDataGrid(props) {
    if(!props.data) return;
    
    const data = [];

    props.data.forEach((datum, index) => {
        let title = null;
        let value =  null;

        if(typeof datum.title === 'object') {
            title = (
                <span 
                    className={style.dataTitle}  
                    key={`t-${index}`}
                >
                    {datum.title}
                </span>
            );
        } else {
            title = (
                <Text 
                    color='grey' 
                    size={14} 
                    ellipsis 
                    key={`t-${index}`} 
                    {...props.titleProps} 
                    className={`${style.dataTitle} ${props.titleProps.className || ''}`}
                >
                    {datum.title || '-'}
                </Text>
            );
        }

        if(datum.value && typeof datum.value === 'object') {
            value = (
                <span 
                    className={`${style.dataValue} ${props.valueWrapperClassName || ''}`} 
                    key={`v-${index}`}
                >
                    {datum.value}
                </span>
            );
        } else {
            value = (
                <Text 
                    size={14}  
                    ellipsis 
                    key={`v-${index}`} 
                    {...props.valueProps} 
                    className={`${style.dataValue} ${props.valueProps.className || ''}`}
                >
                    {datum.value || '-'}
                </Text>
            );
        }

        data.push((
            <div 
                key={`t-${index}-v-${index}`} 
                className={`${style.row} ${props.hoverEffect? style.hoverEffect : ''}`}
            >
                {title}
                {value}
            </div>
        ));
    });

    return (
        <div className={`${style.ReportDataGrid} ${props.className || ''}`} style={props.style || {}}>
            {data}
        </div>
    );
}

ReportDataGrid.defaultProps = {
    titleProps: {},
    valueProps: {}
};

export default ReportDataGrid;