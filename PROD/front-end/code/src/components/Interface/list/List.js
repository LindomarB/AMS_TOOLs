import React, { useEffect, useRef, useState } from 'react';
import Card from '../card/Card';
import Loading from '../loaders/loading/Loading';
import style from './List.module.css';
import useSettings from '../../hooks/useSettings';
import NoDataFound from '../noDataFound/NoDataFound';

function List(props) {
    const [loading, setLoading] = useState(props.loading);
    const [awaitingOnReachBottom, setAwaitingOnReachBottom] = useState();
    const loadingTimer = useRef();
    const onReachBottomTimer = useRef();

    const list = useRef();
    const scrollPosition = useSettings({
        key: `${props.name}-list-scroll-position`,
        storageType: 'session'
    });

    useEffect(() => {
        if(props.initialScroll) {
            setTimeout(() => list.current.scrollTo({
                    left: props.initialScroll.x, 
                    top: props.initialScroll.y,
                    behavior: 'instant'
            }), 100);
        } else if(props.saveScrollPosition && props.name) {
            setTimeout(() => list.current.scrollTo({
                ...scrollPosition.get()
            }), 100);
        }
    }, []);

    useEffect(() => {
        const saveScrollPosition = (event) => {
            scrollPosition.update({
                left: event.target.scrollLeft, 
                top: event.target.scrollTop,
                behavior: 'instant'
            });
        }

        if(props.saveScrollPosition && props.name) {
            list.current.addEventListener('scroll', saveScrollPosition);
        }
    }, [props.saveScrollPosition]);

    useEffect(() => {
        if(props.loading) {
            loadingTimer.current = setTimeout(() => setLoading(true), 2000);
        } else {
            clearTimeout(loadingTimer.current);
            setLoading(false);
        }
    }, [props.loading]);

    const onReachBottom = async () => {
        const reachBottom = list.current.scrollTop + list.current.offsetHeight > list.current.scrollHeight - 16;

        if(reachBottom && !awaitingOnReachBottom && !onReachBottomTimer.current) {
            onReachBottomTimer.current = setTimeout(() => setAwaitingOnReachBottom(true), 2000);

            setTimeout(() => setAwaitingOnReachBottom(false), 10000);

            await props.onReachBottom();

            if(awaitingOnReachBottom) {
                setAwaitingOnReachBottom(false);
            } else {
                clearTimeout(onReachBottomTimer.current);
            }

            onReachBottomTimer.current = null;
        }
    }
    
    const items = props.children.map((item, idx) => {
        let onClick = props.onClickItem;

        if(item.props && item.props.onClick) {
            onClick = () => {
                item.props.onClick(item);
                props.onClickItem && props.onClickItem(item);
            }
        }

        const active = item.props && item.props.active

        return (
            <div 
                key={`list-item-${idx}`} 
                className={`${style.listItem} ${item.props.listItemClassName || ''} ${props.hoverEffect || onClick? `${style.hover} ${props.noBorderRadius? style.noBorderRadius : ''}` : ''} ${active? item.props.activeClassName || props.activeClassName || style.active : ''} ${onClick? style.pointer : ''} ${props.itemClassName || ''}`} 
                onClick={onClick || null}
            >
                {item}
            </div>
        );
    });

    return (
        <Card className={`${props.className || ''}`} style={props.style || {}}>
            <div 
                ref={list} 
                className={`${style.List} ${props.containerClassName || ''}`} 
                onScroll={props.onReachBottom? onReachBottom : null}
            >
                {loading
                    ? <div className={style.loader}><Loading /></div>
                    : items.length
                    ? items
                    : <NoDataFound icon={props.noDataIcon} text={props.noDataMessage || 'No data was found'}/>
                }
                {awaitingOnReachBottom && 
                    <div className={`${style.loader} ${style.reachBottom}`}><Loading /></div>
                }
            </div>
        </Card>
    );
}

export default List;