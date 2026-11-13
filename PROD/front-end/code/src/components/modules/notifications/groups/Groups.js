import React, { useContext, useEffect, useState } from 'react';
import capitalize from '../../../../functions/text/capitalize';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import IconNavbar from '../../../Interface/navigation/IconNavbar/IconNavbar';
// import style from './Groups.module.css';

function Groups(props) {
    const fetcher = useContext(FetcherContext);

    // useEffect(() => {
    //     fetchNotifications();
    // }, [props.open]);


    const handleOnSelectGroup = (group) => {
        props.setCurrentGroup(group);
    }
    
    const groups = ['global'];
    if(props.user.profile.role !== 'analyst') groups.push('leaders');
    groups.push(...['team', 'private', 'system']);



    const items = groups.map(group => ({
        icon: group, 
        label: capitalize(group),
        active: group === props.currentGroup,
        onClick: () => handleOnSelectGroup(group),
        alert: group === 'global'? true : group === 'team'? 6 : false
    }));

    return (
        <IconNavbar 
            // className={style.iconNavbar} 
            // itemClassName={style.item} 
            // activeClassName={style.activeItem} 
            buttons={items} 
            color='grey'
        />
    );
}

export default Groups;