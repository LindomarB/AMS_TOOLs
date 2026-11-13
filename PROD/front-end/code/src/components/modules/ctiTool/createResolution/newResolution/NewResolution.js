import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import modules from '../../../../../data/app/modules';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import LoadableContent from '../../../../Interface/containers/loadableContent/LoadableContent';
import NewResolutionForm from '../../resolutionForm/forms/NewResolutionForm';
import UserContext from '../../../../context/userContext/UserContext';
import AppContext from '../../../../context/appContext/AppContext';

function NewResolution(props) {
    const [resolution, setResolution] = useState(null);
    const userCtx = useContext(UserContext);
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        refreshUser().
        then(() => {
            fetchResolution().
            then(() => {
                // setLoading(false);
            });
        }).catch(() => {
            navigate(modules('cti tool', 'create resolution').path);
        });
    }, [searchParams.get('copy'), searchParams.get('progress')]);

    const refreshUser = async () => {
        const res = await userCtx.refresh();

        if(!res.ok) {
            navigate(modules('cti tool', 'create resolution').path);
        }
    }

    const fetchResolution = async () => {
        let res = null;

        if(searchParams.get('progress')) {
            res = await fetcher.getResolutionsInProgress({
                query: {_id: searchParams.get('progress')}
            });
        } else if(searchParams.get('copy')) {
            res = await fetchToCopy();
        } else {
            return;
        }

        if(res.ok) {
            if(!res.data[0]) {
                appCtx.notify({
                    type: 'warning',
                    message: 'Resolution not found'
                });

                navigate(modules('cti tool', 'create resolution').path);
            }

            setResolution(res.data[0]);
        } else {
            navigate(modules('cti tool', 'create resolution').path);
        }
    }

    const fetchToCopy = async () => {
        const res = await fetcher.getResolutions({
            query: {_id: searchParams.get('copy')}, 
            settings: {
                projection: {
                    _id: 0,
                    'incident.incident': 0,
                    meta: 0
                }
            }
        });

        if(res.ok && res.data.length) {
            const requestApplication = res.data[0].incident.application;
            const requestSupportGroup = res.data[0].incident['support group'];
            const userHasApplicationPermission = userCtx.getCTIApplication(requestApplication, requestSupportGroup);

            if(!userHasApplicationPermission) {
                res.data[0].incident.country = '';
                res.data[0].incident.application = '';
                res.data[0].incident['support group'] = '';
            }
        }

        return res;
    }

    const storage = {
        key: props.storageKey
    }

    const loading = (searchParams.get('progress') || searchParams.get('copy')) && !resolution;

    return (
        <LoadableContent loading={loading}>
            {!loading && 
                <NewResolutionForm 
                    storage={storage} 
                    id={searchParams.get('progress')}
                    initialValues={resolution}
                    unsaved={props.unsaved}
                    backTo={searchParams.get('copy') && `${modules('cti tool', 'search').path}?id=${searchParams.get('copy')}`}
                />
            }
        </LoadableContent>
    );
}

export default NewResolution;