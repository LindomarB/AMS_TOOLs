import React from 'react';
import Text from '../../../../../Interface/Text/Text';
import Icon from '../../../../../Interface/icons/icon/Icon';
import style from './NavigationLegend.module.css';

function NavigationLegend(props) {
    return (
        <div className={`${style.NavigationLegend} ${props.className || ''}`}>
            <div className={style.legend}>
                <Text size={12} className={style.text} color='black' weight={600}>
                    <Icon color='black' name='search' size={18} weight={400} filled/>
                    Zoom
                </Text>
                <Text size={12} color='grey'>Ctrl + Wheel</Text>
            </div>
            <div className={style.legend}>
                <Text size={12} className={style.text} color='black' weight={600}>
                    <Icon color='black' name='pan_tool' size={18} weight={400} filled/>
                    Pan
                </Text>
                <Text size={12} color='grey'>Space + Click</Text>
            </div>
        </div>
    );
}

export default NavigationLegend;