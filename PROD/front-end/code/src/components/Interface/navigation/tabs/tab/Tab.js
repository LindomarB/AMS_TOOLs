import React, { useEffect, useState} from "react";
import Button from "../../../buttons/button/Button";
import style from "./Tab.module.css";

/*
    COMPONENT PROPS

    tabs (required): an array with the menu items. Can be strings or JSX elements. You can pass a object {path, label} to create a NavLink (path must be absolute);
    selectedTab (required): the current selected tab value. It is not required if the tab are NavLinks.
    onSelectTab (required): the function that will be executed when an item is clicked, and receive as argument the item index (relative to the props.items array).
    vertical (optional): a boolean. Define the menu direction. Default is false (menu in horizontal);
    className (optional): a CSS class to be applied on the main component.
    tabClassName (optional): a CSS class to be applied on the items.
    selectorClassName (optional): a CSS class to be applied on the selector.
*/

function Tab(props) {
    const [tab, setTab] = useState();

    useEffect(() => {
        if(props.active && tab) {
            const height = `${tab.getBoundingClientRect().height / 16}rem`;
            const width = `${tab.getBoundingClientRect().width / 16}rem`;
            const topOffset = `${tab.offsetTop}px`;
            const leftOffset = `${tab.offsetLeft}px`;
            props.moveSelector(width, height, topOffset, leftOffset);
        }
    }, [props.active, tab]);


    return (
        <Button
            color='theme'
            {...props}
            className={`${style.Tab} ${props.className || ''} ${props.pill? style.pill : ''}`} 
            path={null}
            getRef={setTab}
        >
            {props.children}
        </Button>
    );
}

export default Tab;