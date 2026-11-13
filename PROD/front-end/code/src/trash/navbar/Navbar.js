import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Navbar.module.css';
import NavbarButton from './NavbarButton/NavbarButton';
import Link from './Link/Link';
import AppContext from '../../context/appContext/AppContext';
import Submenu from './submenu/Submenu';

function Navbar (props) {
    const [showLabels, setShowLabels] = useState(
        (props.initialState === 'showLabels')? true : false
    );
    const [submenu, setSubmenu] = useState({
        show: false,
        origin: null,
        items: null
    });
    const [selectBarPosition, setSelectBarPosition] = useState(53);
    const closeSubmenuTimer = useRef(null);

    const appCtx = useContext(AppContext);
    const lexicon = appCtx.lexicon.theme.navbar;
    const icons = appCtx.icons;

    // useEffect(() => {
    //     const autoCollapse = () => {
    //         if(window.innerWidth <= 1000) {
    //             setShowLabels(false);
    //         }
    //     }

    //     window.addEventListener('resize', autoCollapse);

    //     return () => window.removeEventListener('resize', autoCollapse);
    // }, []);

    useEffect(() => {
        if(props.setPaddingLeft) {
            props.setPaddingLeft(showLabels? props.expandedWidth : null);
        }
    }, [showLabels]);

    const handleToggleMenu = () => {
        setShowLabels(curSt => !curSt);
    }

    const closeSubmenu = () => {
        setSubmenu({
            show: false,
            origin: null,
            items: null
        });
    }

    const handleOnMouseLeave = () => {
        closeSubmenuTimer.current = setTimeout(closeSubmenu, 200);
    }

    const clearCloseSubmenuTimer = () => {
        clearTimeout(closeSubmenuTimer.current);
        closeSubmenuTimer.current = null;
    }

    let menuCollapser = null;

    if(props.menuCollapser) {
        menuCollapser = {
            onClick: handleToggleMenu,
            icon: showLabels
                ? {...icons.collapseMenu, style: {transition: 'none'}}
                : {...icons.collapseMenu, style: {transform: 'rotate(180deg)', transition: 'none'}},
            label: showLabels? lexicon.collapseMenu : lexicon.expandMenu,
            dontMoveSelectBar: true,
            available: true
        }
    }

    const items = [...props.items, menuCollapser].map((item, idx) => {
        if(!item || !item.available) return null;
        
        const attributes = {
            ...item,
            className: props.buttonClassName,
            key: `menu-item-${item.id || idx}`,
            showLabel: showLabels,
            disableTooltip: item.submenuItems? true : showLabels,
            setSelectBarPosition,
            setSubmenu,
            forceHover: item.label === submenu.origin,
            closeSubmenu
        };

        return item.path? <Link {...attributes}/> : <NavbarButton {...attributes}/>;
    });

    return (
        <div 
            className={`${style.Navbar} ${props.className || ''} ${showLabels? style.expanded : ''}`}
            onMouseLeave={handleOnMouseLeave}
            onMouseEnter={clearCloseSubmenuTimer}
        >
            <nav 
                className={`${style.buttonsContainer} ${submenu.show? style.showBorder : ''}`}
                style={showLabels? {width: props.expandedWidth} : {}}    
            >
                {items}
            </nav>
            <div className={`${style.selectBar} ${props.selectBarClassName || ''}`} style={{top: `${selectBarPosition}px`}}></div>
            <Submenu {...submenu} closeSubmenu={closeSubmenu}/>
        </div>
    );
}

export default Navbar;