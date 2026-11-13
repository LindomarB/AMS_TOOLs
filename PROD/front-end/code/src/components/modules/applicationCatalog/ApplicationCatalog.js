import React, { useEffect, useState } from 'react';
import Page from '../../Interface/page/Page';
import ApplicationDetails from './applicationDetails/ApplicationDetails';
import ApplicationList from './applicationList/ApplicationList';
import useSettings from '../../hooks/useSettings';
import style from './ApplicationCatalog.module.css';

function ApplicationCatalog(props) {
    const settings = useSettings({
        key: 'application-catalog-search',
        storageType: 'session'
    });

    const [currentApplication, setCurrentApplication]  = useState(null);

    // useEffect(() => {
    //     settings.set('currentApplication', currentApplication)
    // }, [currentApplication]);

    return (
        <Page
            className={style.ApplicationCatalog}
            doubleContainer
            rightContainer={{
                className: style.rightContainer
            }}
        >
            <ApplicationList 
                currentApplication={currentApplication} 
                setCurrentApplication={setCurrentApplication} 
                settings={settings}
            />
            <ApplicationDetails id={currentApplication}/>
        </Page>
    );
}

export default ApplicationCatalog;