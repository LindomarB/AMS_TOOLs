import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import modules from '../../../../data/app/modules';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import UserContext from '../../../context/userContext/UserContext';
import LoadableContent from '../../../Interface/containers/loadableContent/LoadableContent';
import EditResolutionForm from '../resolutionForm/forms/EditResolutionForm';

function EditResolution(props) {
    const [resolution, setResolution] = useState(null);
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        refreshUser().
        then(() => {
            if(params.resolution) {
                fetchResolution(params.resolution);
            } else {
                navigate(modules('cti tool', 'search').path);
            }
        }).catch(() => {
            navigate(modules('cti tool', 'search').path);
        });
    }, []);

    useEffect(() => {
        if(resolution) {
            const authorizedUser = userCtx.getCTIApplication(resolution.incident.application, resolution.incident['support group']);

            if(!authorizedUser) {
                navigate(modules('cti tool', 'search').path);
            }
        }
    }, [resolution]);

    const refreshUser = async () => {
        const res = await userCtx.refresh();

        if(!res.ok) {
            navigate(modules('cti tool', 'search').path);
        }
    }

    const fetchResolution = async (_id) => {
        const res = await fetcher.getResolutions({query: {_id}});

        if(res.ok) {
            setResolution(res.data[0]);
        } else {
            navigate(modules('cti tool', 'search').path);
        }
    }

    return (
        <LoadableContent loading={!resolution}>
            {resolution &&
                <EditResolutionForm 
                    id={resolution._id}
                    initialValues={resolution}
                    enableDelete={userCtx.user.profile.role !== 'analyst'}
                    initialSection='incident'
                />
            }
        </LoadableContent>
    );
}

export default EditResolution;