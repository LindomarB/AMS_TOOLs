import React, { useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";
import Tab from "./tab/Tab";
import style from "./Tabs.module.css";

/*
    COMPONENT PROPS

    tabs (required): an array with the menu items. Can be strings or JSX elements. You can pass an object {path, label} to create a NavLink (path must be absolute), or an object {label, value} to give a different value of return than the label;
    selectedTab (required): the current selected tab value. It is not required if the tab are NavLinks.
    onClick (required): the function that will be executed when an item is clicked, and receive as argument the tab value.
    vertical (optional): a boolean. Define the menu direction. Default is false (menu in horizontal);
    track (optional): show the line track
    className (optional): a CSS class to be applied on the main component.
    activeClassName (optional): a CSS to be applied on the active tab.
    tabClassName (optional): a CSS class to be applied on the items.
    selectorClassName (optional): a CSS class to be applied on the selector.
    navStyle (optional): a style object to be applied on the nav tag.
    pill (optional): applies the 'pill' style.
*/

function Tabs(props) {
    const ul = useRef();
    const selector = useRef();

    useEffect(() => {
        if(!props.selectedTab) {
            const firstTab = props.tabs[0];
            handleOnClick(firstTab.value || firstTab.text || firstTab);
        }
    }, []);

    const moveSelector = (width, height, topOffset, leftOffset) => {
        if(props.vertical) {
            selector.current.style.height = height;
            selector.current.style.top = topOffset;
        } else {
            selector.current.style.width = width;
            selector.current.style.left = leftOffset;
        }
    }

    const findTabIndex = () => {
        if(!props.selectedTab) return 0;

        const index = props.tabs.findIndex(tab => {
            const value = tab.value || tab.text || tab;
            return value.toLowerCase() === props.selectedTab.toLowerCase()
        });

        return (index === -1)? null : index
    }

    const handleOnClick = (tab) => {
        props.onClick && props.onClick(tab);
    }

    const tabs = props.tabs.map((tab, idx) => {
        const isTabString = typeof tab === 'string';
        const tabProps = {
            className: props.tabClassName,
            activeClassName: props.activeClassName,
            vertical: props.vertical,
            pill: props.pill,
            moveSelector: moveSelector,
            onClick: () => handleOnClick(tab.value || tab.text || tab),
            type: props.type || 'text',
            ...isTabString? {} : tab
        }

        if(tab.path) {
            return (
                <NavLink key={`tab-${idx}`} to={tab.path} end={tab.absolutePath}>
                    {({isActive}) => {
                        return (
                        <Tab {...tabProps} active={isActive} >
                            {tab.text}
                        </Tab>
                    )}}
                </NavLink>
            );
        } else {
            const selectedTabIndex = findTabIndex();

            return (
                <Tab {...tabProps} key={`tab-${idx}`} active={selectedTabIndex === idx}>
                    {isTabString? tab : tab.text}
                </Tab>
            );
        }
    });

    const selectorClassName = [];

    if(props.pill) {
        selectorClassName.push(style.pillSelector);
        selectorClassName.push(props.vertical? style.pillSelectorVertical : style.pillSelectorHorizontal);
    } else {
        selectorClassName.push(style.ruleSelector);
        selectorClassName.push(props.vertical? style.ruleSelectorVertical : style.ruleSelectorHorizontal);
        props.vertical && props.selectorSide === 'right' && selectorClassName.push(style.ruleSelectorRight);
    }

    props.selectorClassName && selectorClassName.push(props.selectorClassName);

    return (
        <div 
            className={`${style.Tabs} ${props.track? (props.vertical && style.verticalTrack) || style.horizontalTrack : ''} ${props.className || ''}`}
            style={props.style || {}}
        >
            <nav ref={ul} className={`${style.tabsContainer} ${props.vertical? `${style.verticalContainer} ${props.selectorSide === 'right'? style.verticalContainerRight : ''}` : style.horizontalContainer} ${props.pill? style.pill : ''} ${props.tabsContainerClassName || ''}`}>
                {tabs}
            </nav>
            <div ref={selector} className={selectorClassName.join(' ')}></div>
        </div>
    );
}

export default Tabs;