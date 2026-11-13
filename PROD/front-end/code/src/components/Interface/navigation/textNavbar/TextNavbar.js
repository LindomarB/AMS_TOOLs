import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../buttons/button/Button";
import Rule from "../../rule/Rule";
import Text from "../../Text/Text";
import style from './TextNavbar.module.css';
import sortByField from "../../../../functions/array/sortByField";

function TextNavbar(props) {
    const createItems = (items, isSectionItem = false) => {
        return items.reduce((array, item, idx, items) => {
            if(item.sectionName) {
                array.push(
                    <div key={`section-${idx}-${item.sectionName}`} className={style.section}>
                        <Text color='grey' size={12} weight={600} transform='capitalize'>{item.sectionName}</Text>
                        {createItems(item.items, true)}
                    </div>
                );
            } else {
                const buttonProps = {
                    ...item,
                    className: `${style.button} ${props.buttonClassName || ''}`,
                    activeClassName: props.activeClassName || style.active,
                    type: 'text',
                    color: 'grey',
                    onClick: item.onClick || props.onClick,
                };

                const key = `${idx}-${item.label}`;

                if(item.path) {
                    array.push(
                        <NavLink key={key} to={item.path} end>
                           {({isActive}) => (
                               <Button 
                                    {...buttonProps}
                                    path={null}
                                    active={isActive}
                                >
                                   {item.label}
                               </Button>
                           )}
                       </NavLink>
                    );
                } else {
                    array.push(
                        <Button 
                            key={key}
                            {...buttonProps}
                            active={item.active || item.value === props.selectedItem || item.label === props.selectedItem}
                            onClick={item.onClick}
                        >
                            {item.label}
                        </Button>
                    );
                }
            }
            
            if(!props.disableRules && !isSectionItem && idx < items.length - 1) {
                array.push(<Rule key={`rule-${idx}-${item.label}`} color='lightBorder'/>);
            }

            return array;
        }, []);
    }

    let items = null;

    if(props.notSort) {
        items = createItems(props.items);
    } else {
        items = createItems(sortByField(
            props.items.map(item => {
                if(item.sectionName) {
                    item.label = item.sectionName;
                    item.items = sortByField(item.items, 'label');
                }

                return item;
            }),
            'label'
        ));
    }

    return (
        <nav className={`${style.TextNavbar} ${props.className || ''}`}>
            {props.title &&
                <Text className={style.title} size={16}>{props.title}</Text>
            }
            {items}
        </nav>
    );
}

export default TextNavbar;