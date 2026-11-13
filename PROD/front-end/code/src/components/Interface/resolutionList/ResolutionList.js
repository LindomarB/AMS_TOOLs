import React, { useContext, useEffect, useState } from 'react';
import FetcherContext from '../../context/fetcherContext/FetcherContext';
import List from '../list/List';
import Section from '../section/Section';
import Resolution from './resolution/Resolution';
import style from './ResolutionList.module.css';

function ResolutionList(props) {
    const [resolutions, setResolutions] = useState([]);
    const [lastId, setLastId] = useState();
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchResolutions();
    }, []);

    const fetchResolutions = async () => {
        const settings = {
            query: props.query,
            settings: props.settings
        }

        let res = null;

        if(props.inProgress) {
            res = await fetcher.getResolutionsInProgress(settings);
        } else {
            res = await fetcher.getResolutions(settings);
        }

        setResolutions(res.ok? res.data : []);
    }

    const handleOnDelete = async (_id) => {
        const res = await fetcher.deleteResolutionProgress({query: {_id}});
        
        if(res.ok) {
            fetchResolutions();
        }
    }

    const listItems = resolutions.map(resolution => (
        <Resolution 
            key={resolution._id} 
            resolution={resolution}
            onClick={() => props.onClickResolution(resolution._id)}
            onDelete={props.inProgress? () => handleOnDelete(resolution._id) : null}
        />
    ));

    return (
        <Section className={style.ResolutionList} title={props.title}>
            <List 
                className={style.list} 
                noDataIcon='resolution' 
                noDataMessage='No resolutions in progress' 
                loading={fetcher.awaitingResponse}
            >
                {listItems}
            </List>
        </Section>
    );
}

export default ResolutionList;