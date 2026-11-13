import React, { useContext, useEffect, useState } from 'react';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import Resolution from './resolution/Resolution';
import style from './InProgress.module.css';
import Section from '../../../../../Interface/section/Section';
import List from '../../../../../Interface/list/List';

function InProgress(props) {
    const [resolutions, setResolutions] = useState([]);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchResolutions();
    }, []);

    const fetchResolutions = async () => {
        const res = await fetcher.getResolutionsInProgress({
            query: {
                'meta.created by._id': props.userId
            },
            settings: {
                projection: {
                    incident: {
                        incident: 1, 
                        application: 1
                    },
                    classification: 1,
                    pbi: 1,
                    meta: {
                        'created on': 1,
                        progress: 1
                    }
                }
            }
        });

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
            onDelete={() => handleOnDelete(resolution._id)}
        />
    ));

    return (
        <Section 
            className={style.InProgress} 
            title='Resolutions in Progress'
            color='theme'
            iconProps={{
                name: 'resolution in progress'
            }}
        >
            <List 
                className={style.list} 
                noDataMessage='No resolutions in progress' 
                loading={fetcher.awaiting.getResolutionsInProgress}
            >
                {listItems}
            </List>
        </Section>
    );
}

export default InProgress;