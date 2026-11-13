import React, { useEffect, useState } from 'react';
import Page from '../../../Interface/page/Page';
import ResolutionDetails from './resolutionDetails/ResolutionDetails';
import ResolutionList from './resolutionList/ResolutionList';
import style from './Search.module.css';
import { useSearchParams } from 'react-router-dom';
import useSettings from '../../../hooks/useSettings';

function Search(props) {
    const settings = useSettings({
        key: 'resolution-search',
        storageType: 'session'
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentResolution, setCurrentResolution]  = useState(searchParams.get('id') || settings.get('currentResolution'));
    const [expandedList, setExpandedList] = useState(!currentResolution);

    useEffect(() => {
        searchParams.delete('id');
        searchParams.delete('inc');
        searchParams.delete('resetSettings');
        setSearchParams(searchParams);
    }, []);

    // useEffect(() => {
    //     settings.set('currentResolution', currentResolution);
    // }, [currentResolution]);

    if(searchParams.get('resetSettings')) {
        settings.reset();
    }

    return (
        <Page
            className={style.Search}
            doubleContainer
            leftContainer={{className: `${style.resolutionList} ${expandedList? style.expanded : ''}`}}
            rightContainer={{className: `${style.resolutionDetails}`}}
        >
            <ResolutionList 
                currentResolution={currentResolution} 
                setCurrentResolution={setCurrentResolution} 
                searchCurrentResolution={searchParams.get('inc')}
                expanded={expandedList} 
                setExpanded={setExpandedList}
                settings={settings}
            />
            <ResolutionDetails id={currentResolution}/>
        </Page>
    );
}

export default Search;