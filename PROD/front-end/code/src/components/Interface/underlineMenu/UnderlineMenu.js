import React, { useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";
import style from "./UnderlineMenu.module.css";

/*
    COMPONENT PROPS

    items (required): an array with the menu items. Can be strings or JSX elements.
    selectedItemIndex (required): the current selected item index.
    onSelectItem (required): the function that will be executed when an item is clicked, and receive as argument the item index (relative to the props.items array).
    vertical (optional): a boolean. Define the menu direction. Default is false (menu in horizontal);
    className (optional): a CSS class to be applied on the main component.
    itemClassName (optional): a CSS class to be applied on the items.
    underlineClassName (optional): a CSS class to be applied on the underline.
*/

function Button(props) {
    const button = useRef();

    useEffect(() => {
        if(props.active) {
            if(props.vertical) {
                const height = `${button.current.getBoundingClientRect().height + 10}px`;
                const offset = `${button.current.offsetTop - 5}px`;
                props.moveUnderline(height, offset);
            } else {
                const width = `${button.current.getBoundingClientRect().width + 10}px`;
                const offset = `${button.current.offsetLeft - 5}px`;
                props.moveUnderline(width, offset);
            }
        }
    }, [props.active]);

    const activeClass = props.activeCLassName || style.active;
    
    return (
        <button 
            ref={button}
            className={`${style.Button} ${props.className || ''} ${props.active? activeClass : ''}`} 
            onClick={props.onClick || null}
            label={props.children}
        >
            {props.children}
        </button>
    );
}

function UnderlineMenu(props) {
    const ul = useRef();
    const underline = useRef();
    // const firstRender = useRef(true);

    // useEffect(() => {
    //     const selectedItemEl = ul.current.children[props.selectedItem];

    //     if(firstRender.current) {
    //         setTimeout(() => {
    //             underline.current.style.width = `${selectedItemEl.getBoundingClientRect().width}px`;
    //             underline.current.style.left = `${selectedItemEl.offsetLeft}px`;
    //         }, 100);

    //         firstRender.current = false;
    //     } else {
    //         underline.current.style.width = `${selectedItemEl.getBoundingClientRect().width}px`;
    //         underline.current.style.left = `${selectedItemEl.offsetLeft}px`;
    //     }
        
    // }, [props.selectedItem]);
    
    const moveUnderline = (size, offset) => {
        if(props.vertical) {
            underline.current.style.height = size;
            underline.current.style.top = offset;
        } else {
            underline.current.style.width = size;
            underline.current.style.left = offset;
        }
    }

    const findItemIndex = () => {
        if(!props.selectedItem) return 0;
        
        const index = props.items.findIndex(item => 
            item.toLocaleLowerCase() === props.selectedItem.toLocaleLowerCase()
        );
    
        return (index === -1)? null : index
    }

    const handleOnClick = (idx) => {
        if(props.onSelectItem) props.onSelectItem(props.items[idx]);
    }

    const listItems = props.items.map((item, idx) => {
        const buttonProps = {
            className: props.itemClassName,
            activeClassName: props.activeClassName,
            vertical: props.vertical,
            moveUnderline: moveUnderline,
            onClick: () => handleOnClick(idx)
        }

        if(item.path) {
            return (
                <NavLink 
                    key={`underline-menu-item-${idx}`}
                    to={item.path} 
                    end={item.absolutePath}
                >
                    {({isActive}) => (
                        <Button
                            {...buttonProps}
                            active={isActive}
                        >
                            {item.label}
                        </Button>
                    )}
                </NavLink>
            );
        } else {
            const selectedItemIndex = findItemIndex();
            
            return (
                <Button 
                    {...buttonProps}
                    key={`underline-menu-item-${idx}`}
                    active={selectedItemIndex === idx}
                >
                    {item}
                </Button>
            );
        }
    });

    return (
        <div className={`${style.UnderlineMenu} ${props.vertical? style.vertical : ''} ${props.className || ""}`}>
            <nav ref={ul} className={props.vertical? style.vertical : style.horizontal}>
                {listItems}
            </nav>
            {props.vertical
                ? <div ref={underline} className={`${style.verticalLine} ${props.underlineClassName || ''}`}></div>
                : <div ref={underline} className={`${style.underline} ${props.underlineClassName || ''}`}></div>
            }
        </div>
    );
}

export default UnderlineMenu;