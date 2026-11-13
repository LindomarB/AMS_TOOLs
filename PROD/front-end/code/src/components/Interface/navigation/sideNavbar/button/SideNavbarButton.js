import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../../../context/appContext/AppContext';
import Button from '../../../buttons/button/Button';
import Text from '../../../Text/Text';
import TextNavbar from '../../textNavbar/TextNavbar';
import style from './SideNavbarButton.module.css';

function SideNavbarButton(props) {
    const appCtx = useContext(AppContext);
    const location = useLocation();

    const handleOnClick = () => {
        if(props.path) {
            appCtx.showNavigationWarning(props.path, props.onClick);
        } else {
            props.onClick && props.onClick();
        }
    }

    const isActive = `/${location.pathname.split('/')[1]}` === props.path;

    let tooltip = !props.isExpanded && props.children;
    let tooltipProps = null;

    if(tooltip && props.submenu) {
        tooltipProps = {
            className: style.submenuTooltip,
            contentClassName: style.submenu,
            hideDelay: 250,
            holdWhenMouseOver: true,
            hideArrow: true
        };

        tooltip = (
            <>
                <Text className={style.submenuTitle} color='white' weight={600}>{props.label}</Text>
                <TextNavbar 
                    className={style.submenu} 
                    buttonClassName={style.submenuButton} 
                    activeClassName={style.submenuButtonActive} 
                    items={props.submenu} 
                    disableRules
                />
            </>
        );
    }

    return (
        <Button
            className={`${style.SideNavbarButton} ${props.isExpanded? style.expanded : ''} ${props.noHover? style.noHover : ''} ${props.className || ''}`}
            textClassName={style.label}
            activeClassName={style.active}
            color='white'
            icon={props.icon} 
            iconSize={24}
            iconWeight={200}
            iconFilled={props.iconFilled}
            tooltip={tooltip}
            tooltipPosition='right'
            tooltipProps={tooltipProps}
            active={isActive}
            onClick={handleOnClick}
        >
            {props.isExpanded && props.children}
        </Button>
    );
}

export default SideNavbarButton;