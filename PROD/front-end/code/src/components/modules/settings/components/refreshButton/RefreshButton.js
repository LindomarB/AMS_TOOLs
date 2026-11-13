import React from 'react';
import Button from '../../../../Interface/buttons/button/Button';
import style from './RefreshButton.module.css';

function RefreshButton(props) {
    return (
        <Button
            className={style.RefreshButton}
            icon='refresh'
            tooltip='Refresh Data'
            onClick={props.onRefresh}
        />
    );
}

export default RefreshButton;