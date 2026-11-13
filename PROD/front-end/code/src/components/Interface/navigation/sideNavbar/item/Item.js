import React, { useEffect, useState } from 'react';
import SideNavbarButton from '../button/SideNavbarButton';
import Button from '../../../buttons/button/Button';
import TextNavbar from '../../textNavbar/TextNavbar';
import style from './Item.module.css';

function Item(props) {
    const [isSubmenuExpanded, setIsSubmenuExpanded] = useState(false);

    useEffect(() => {
        !props.isExpanded && setIsSubmenuExpanded(false);
    }, [props.isExpanded]);

    const handleOnExpandSubmenu = () => {
        setIsSubmenuExpanded(curSt => !curSt);
    }

    return (
        <div className={`${style.Item} ${props.isExpanded? style.expanded : ''}`}>
            <div className={style.buttonWrapper}>
                <SideNavbarButton {...props}>{props.label}</SideNavbarButton>
                {props.submenu &&
                    <Button 
                        className={style.expandSubmenu2}
                        type='icon'
                        icon={isSubmenuExpanded? 'expand_less' : 'expand_more'}
                        iconFilled
                        color='white'
                        onClick={handleOnExpandSubmenu}
                    />
                }
            </div>
            {props.submenu &&
                <div className={`${style.submenu} ${props.isExpanded && isSubmenuExpanded? style.expanded : ''}`}>
                    <TextNavbar 
                        className={style.textNavbar} 
                        buttonClassName={style.textButton} 
                        activeClassName={style.textButtonActive} 
                        items={props.submenu} 
                        onClick={props.onClick}
                        disableRules
                    />
                </div>
            }
        </div>
    );
}

export default Item;