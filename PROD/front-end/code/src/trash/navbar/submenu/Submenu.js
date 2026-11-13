import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import style from './Submenu.module.css';
import SubmenuButton from './submenuButton/SubmenuButton';

function Submenu(props) {
    let key = 'close';
    const items = [];

    if(props.items) {
        key = props.origin;
        const groups = {};
    
        props.items.forEach(item => {
            const submenuButton = (
                <SubmenuButton 
                    key={item.label} 
                    path={item.path} 
                    onClick={props.closeSubmenu}
                    notification={item.notification}
                >
                    {item.label}
                </SubmenuButton>
            );
    
            if(item.group) {
                if(!groups[item.group]) groups[item.group] = [];
    
                groups[item.group].push(submenuButton);
            } else {
                items.push(submenuButton);
            }
        });

        for(let group in groups) {
            const groupButtons = (
                <div key={`group-${group}`} className={style.group}>
                    <p className={style.groupName}>{group}</p>
                    {groups[group]}
                </div>
            );
    
            items.push(groupButtons);
        }
    }

    const transitionClassNames = {
        enter: style.enter,
        enterActive: style.enterActive,
        enterDone: style.enterDone,
        exit: style.exit,
        exitActive: style.exitActive,
        exitDone: style.exitDone,
    };
    return (
        <div className={`${style.Submenu} ${props.show? style.show : ''}`}>
            <div className={style.itemsContainerWrapper}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={key}
                        mountOnEnter
                        unmountOnExit
                        timeout={{
                            enter: 200,
                            exit: 200
                        }}
                        classNames={transitionClassNames}
                    >
                        <div className={style.itemsContainer}>
                            {items}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}

export default Submenu