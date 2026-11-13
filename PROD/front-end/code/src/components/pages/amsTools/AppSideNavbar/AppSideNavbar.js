import React, { useContext } from 'react';
import UserContext from '../../../context/userContext/UserContext';
import SideNavbar from '../../../Interface/navigation/sideNavbar/SideNavbar';
import style from './AppSideNavbar.module.css';

function AppSideNavbar(props) {
    const user = useContext(UserContext).user;
    const items = [];

    items.push({
        module: 'home',
        group: 1
    });

    user.accesses.includes('cti tool') && items.push({
        module: 'cti tool',
        group: 1
    });

    items.push({
        module: 'application catalog',
        group: 1
    });

    items.push({
        module: 'sla time',
        group: 1
    });

    user.accesses.includes('notification center') && items.push({
        module: 'notification center',
        group: 2
    });

    user.accesses.includes('team manager') && items.push({
        module: 'team manager',
        group: 2
    });

    items.push({
        module: 'account settings',
        group: 2,
        disableSubmenu: true
    });

    items.push({
        module: 'support',
        group: 2
    });

    return (
        <SideNavbar className={style.AppSideNavbar} items={items} />
    );
}

export default AppSideNavbar;