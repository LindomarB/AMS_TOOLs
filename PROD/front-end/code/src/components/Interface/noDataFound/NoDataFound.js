import React from 'react';
import Text from '../Text/Text';
import Icon from '../icons/icon/Icon';
import style from './NoDataFound.module.css';

function NoDataFound(props) {
    return(
        <Text 
            className={`${style.NoDataFound} ${props.className || ''}`} 
            color='grey'
        >
            <Icon name={props.icon || 'search_off'} color='grey'/>
            {props.children || props.text || 'No data found'}
        </Text>
    );
}

export default NoDataFound;