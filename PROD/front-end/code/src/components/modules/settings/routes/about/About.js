import React, { useContext, useEffect, useState } from 'react';
import LoadableContent from '../../../../Interface/containers/loadableContent/LoadableContent';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import CurrentPatch from './currentPatch.js/CurrentPatch';
import PatchHistory from './patchHistory/PatchHistory';
import style from './About.module.css';

function About(props) {
    const [currentPatch, setCurrentPatch] = useState(null);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchCurrentPatch();
    }, []);

    const fetchCurrentPatch = async () => {
        const res = await fetcher.getPatchs({
            settings: {
                sort: {
                    date: -1
                },
                limit: 1
            }
        }, {
            awaitingFlag: 'fetchCurrentPatch'
        });

        if(res.ok) {
            setCurrentPatch(res.data[0]);
        }
    }

    return (
        <LoadableContent loading={!currentPatch || fetcher.awaiting.fetchCurrentPatch}>
            <div className={style.About}>
                <CurrentPatch patch={currentPatch}/>
                <PatchHistory/>
            </div>
        </LoadableContent>
    );
}

export default About;