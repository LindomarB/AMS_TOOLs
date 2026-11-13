import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../../../../../data/app/modules';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import UserContext from '../../../../context/userContext/UserContext';
import Button from '../../../../Interface/buttons/button/Button';
import CopyButton from '../../../../Interface/buttons/copyButton/CopyButton';
import LoadableContent from '../../../../Interface/containers/loadableContent/LoadableContent';
import Header from '../../../../Interface/header/Header';
import createRemedyText from '../../../../Interface/resolution/createRemedyText';
import Resolution from '../../../../Interface/resolution/Resolution';
import style from './ResolutionDetails.module.css';
import NoDataFound from '../../../../Interface/noDataFound/NoDataFound';
import ChangeHistory from './changeHistory/ChangeHistory';

function ResolutionDetails(props) {
    const [resolution, setResolution] = useState(null);
    const [showChangeHistory, setShowChangeHistory] = useState(false);
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(props.id) {
            fetchResolution();
            setShowChangeHistory(false);
        }
    }, [props.id]);

    const fetchResolution = async () => {        
        const res = await fetcher.getResolutions({query: {_id: props.id}}, {awaitingFlag: 'getting resolution'});
        setResolution(res.ok? res.data[0]: null);
    }

    const handleOnClickFavorite = async () => {
        const res = await fetcher.updateFavoriteResolutions({
            action: isFavorite? 'remove' : 'add',
            resolution: props.id
        });

        if(res.ok) {
            userCtx.refresh();
        }
    }

    const handleOnCopy = () => {
        navigate(`${modules('cti tool', 'create resolution').getRoute('new resolution').path}?copy=${props.id}`);
    }

    const handleOnEdit = () => {
        navigate(`${modules('cti tool').getRoute('edit resolution').path}/${props.id}`);
    }

    const isFavorite = userCtx.user.settings['cti tool'].favorites && userCtx.user.settings['cti tool'].favorites.includes(props.id);
    let element = <NoDataFound icon='resolution' text='Select a resolution to see it details' />;
    let buttons = null;
    let headerText = 'Resolution';

    if(resolution && showChangeHistory) {
        element = <ChangeHistory resolution={resolution}/>;
        headerText = 'Change History'

        buttons = (
            <Button
                type='icon'
                icon='back'
                tooltip='Back to resolution'
                onClick={() => setShowChangeHistory(false)}
            />
        );
    } else if(resolution) {
        element = <Resolution resolution={resolution}/>;

        const enableEdit = resolution && userCtx.getCTIApplication(resolution.incident.application, resolution.incident['support group']);

        buttons = (
            <>
                <CopyButton
                    type='icon'
                    icon='article'
                    text={createRemedyText(resolution)}
                    tooltip='Get Helix text'
                />
                <Button 
                    type='icon'
                    icon={isFavorite? 'stars' : 'star'}
                    tooltip={isFavorite? 'Remove from favorites' : 'Add to favorites'}
                    active={isFavorite}
                    onClick={handleOnClickFavorite}
                />
                <Button 
                    type='icon'
                    icon='copy'
                    tooltip='Copy resolution'
                    onClick={handleOnCopy}
                />
                {enableEdit && 
                    <Button 
                        type='icon'
                        icon='edit_note'
                        tooltip='Edit'
                        onClick={handleOnEdit}
                    />
                }
                {resolution.meta.changeHistory && 
                    <Button 
                        type='icon'
                        icon='history'
                        tooltip='Change history'
                        onClick={() => setShowChangeHistory(true)}
                    />
                }
            </> 
        );
    }

    return (
        <div className={style.ResolutionDetails}>
            <Header className={style.header} text={headerText} rule>
                {buttons}
            </Header>
            <LoadableContent loading={fetcher.awaiting['getting resolution']} elementKey={resolution? `${resolution._id}-${showChangeHistory? 'changes' : 'details'}` : null}>
                {element}
            </LoadableContent>
        </div>
    );
}

export default ResolutionDetails;