import React, { useContext, useEffect, useRef, useState } from 'react';
import modules from '../../../../data/app/modules';
import AppContext from '../../../context/appContext/AppContext';
import Rule from '../../rule/Rule';
import Item from './item/Item';
import style from './SideNavbar.module.css';
import UserContext from '../../../context/userContext/UserContext';

function SideNavbar(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const lang = useContext(AppContext).currentLanguage;
    const user = useContext(UserContext).user;
    const closeOnMouseLeave = useRef(false);

    useEffect(() => {
        if(!isExpanded) {
            closeOnMouseLeave.current = false;
        }
    }, [isExpanded]);

    const toggleMenu = () => {
        setIsExpanded(curSt => !curSt);
    }

    const onClickItem = () => {
        if(isExpanded) {
            closeOnMouseLeave.current = true;
        }
    }

    const onMouseLeave = () => {
        if(closeOnMouseLeave.current) {
            setIsExpanded(false);
            closeOnMouseLeave.current = false;
        }
    }

    const itemGroups = [[
        <Item 
            key={`menu-item-expand`}
            className={style.expandButton}
            noHover
            icon={isExpanded? 'menu_open' : 'menu'} 
            iconFilled
            label={isExpanded? 'Collapse' : 'Expand'} 
            isExpanded={isExpanded}
            onClick={toggleMenu}
        />
    ]];

    props.items.forEach(item => {
        if(!itemGroups[item.group]) itemGroups[item.group] = [];
    
        const {icon, label, path, submodules} = modules(item.module);

        const submenu = item.disableSubmenu
            ? []
            : submodules.map(submodule => ({
            path: submodule.path,
            label: submodule.label[lang],
            icon: submodule.icon,
            alert: user && user.settings.alerts && user.settings.alerts[submodule.name],
            alertOverIcon: true,
            alertClassName: style.alert
        }));

        itemGroups[item.group].push((
            <Item 
                key={`menu-item-${label[lang]}`}
                icon={icon} 
                label={label[lang]} 
                path={path} 
                submenu={!!submenu.length && submenu} 
                isExpanded={isExpanded}
                onClick={onClickItem}
            />
        ));
    });

    const items = itemGroups.reduce((array, itemGroup, idx) => {
        return [...array, ...itemGroup, <Rule key={idx} className={style.rule}/>]
    }, []);

    items.pop();

    return (
        <nav 
            className={`${style.SideNavbar} ${isExpanded? style.expanded : ''} ${props.className || ''}`} 
            onMouseLeave={onMouseLeave}
        >
            {items}
        </nav>
    );
}

export default SideNavbar;