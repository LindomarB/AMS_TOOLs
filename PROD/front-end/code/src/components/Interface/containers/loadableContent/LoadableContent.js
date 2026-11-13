import React, { useEffect, useRef, useState } from 'react';
import PageTransition from '../../animations/fadeTransition/FadeTransition';
import Loading from '../../loaders/loading/Loading';
import style from './LoadableContent.module.css';

function LoadableContent(props) {
    const [loading, setLoading] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const timer = useRef();

    useEffect(() => {
        setTimeout(() => setFirstRender(false), 250);
    }, []);

    useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setLoading(props.loading), 500);

        if(!props.loading) {
            setFirstRender(false);
        }
    }, [props.loading]);

    let content = null;

    if(!firstRender) {
        content = loading
            ? (
                <div className={`${style.LoadableContent} ${props.className || ''}`}>
                    <Loading />
                </div>
            )
            : props.children;
    }

    return (
        <PageTransition switchTransition currentElementKey={`${firstRender? `firstRender` : ``}${loading? `loading` : `loaded`}${props.elementKey || ''}`}>
            {content}
        </PageTransition>
    );
}

export default LoadableContent;