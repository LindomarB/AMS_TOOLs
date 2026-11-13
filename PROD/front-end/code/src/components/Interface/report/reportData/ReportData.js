import React from 'react';
import Icon from '../../icons/icon/Icon';
import Text from '../../Text/Text';
import ReportDataGrid from '../reportDataGrid/ReportDataGrid';
import style from './ReportData.module.css';

function ReportData(props) {
    const valueProps = {
        size: 14,
        // weight: 500,
        ...props.valueProps || {}
    };

    let valueType = props.value? typeof props.value : 'null';
    let singleGridValue = false;

    if(Array.isArray(props.value)) {
        if(props.value.length) {
            if(typeof props.value[0] === 'string') {
                valueType = 'array';
            } else {
                valueType = 'grid';
                singleGridValue = props.value.length === 1 && !props.hoverEffect;
            }
        } else {
            valueType = 'null';
        }
    }

    return (
        <div className={`${style.ReportData} ${props.className || ''}`}>
            {(props.icon || props.iconProps.name) && 
                <Icon name={props.icon || props.iconProps.name} weight={300} border {...props.iconProps}/>
            }
            <div className={style.dataContainer}>
                {props.title &&
                    <Text 
                        className={`${style.dataTitle} ${valueType === 'grid' && singleGridValue? style.dataTitleGrid : ''} ${props.titleClassName || ''}`} 
                        color='grey' 
                        size={12} 
                        weight={500}
                        {...props.titleProps || {}}
                    >
                        {props.title || '-'}
                    </Text>
                }
                {(valueType === 'string' || valueType === 'number') &&
                    <Text {...valueProps}>{props.value || '-'}</Text>
                }
                {valueType === 'null' &&
                    <Text {...valueProps}>-</Text>
                }
                {valueType === 'array' && 
                    <div className={style.valuesArray}>
                        {props.value.map((value, idx) => 
                            <Text key={`${idx}-${value}`} {...valueProps}>{value || '-'}</Text>
                        )}
                    </div>
                }
                {valueType === 'grid' &&
                    <ReportDataGrid 
                        className={style.dataGrid} 
                        titleProps={
                            props.titleProps || 
                            {
                                color: 'black',
                                // weight: 500, 
                                ...singleGridValue? {className: style.dataGridTitle} : {}
                            }
                        } 
                        valueProps={
                            props.valueProps
                                ? valueProps 
                                : {
                                    color: 'grey', 
                                    ...singleGridValue? {className: style.dataGridValue} : {}
                                }
                        } 
                        data={props.value} 
                        hoverEffect={props.hoverEffect}
                    />
                }
                {valueType === 'object' &&
                    props.value
                }
            </div>
        </div>
    );
}

ReportData.defaultProps = {
    iconProps: {}
};

export default ReportData;