import React, { useContext, useEffect, useState } from 'react';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import Application from '../../../Interface/application/Application';
import Button from '../../../Interface/buttons/button/Button';
import LoadableContent from '../../../Interface/containers/loadableContent/LoadableContent';
import Header from '../../../Interface/header/Header';
import style from './ApplicationDetails.module.css';
import NoDataFound from '../../../Interface/noDataFound/NoDataFound';

function ApplicationDetails(props) {
    const [application, setApplication] = useState(null);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchApplication();
    }, [props.id]);

    const fetchApplication = async () => {
        const res = await fetcher.getApplicationCatalog(
            {
                query: {_id: props.id}
            },
            {awaitingFlag: 'application details'}
        );
        setApplication(res.ok? res.data[0] : null);
    }

    return (
        <div className={style.ApplicationDetails}>
            <Header className={style.header} text='Application' rule>
                {/* <Button 
                    icon='edit'
                    tooltip='Edit Application'
                /> */}
            </Header>
            {(application || fetcher.awaiting['application details']) 
                ? (
                    <LoadableContent loading={fetcher.awaiting['application details']} elementKey={application? application._id : null}>
                        <Application data={application}/>
                    </LoadableContent>
                ) : <NoDataFound icon='application catalog' text='Select an application to see it details'/>
            }
        </div>
    );
}

export default ApplicationDetails;