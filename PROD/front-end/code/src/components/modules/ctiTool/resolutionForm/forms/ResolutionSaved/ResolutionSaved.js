import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../../../../../Interface/Text/Text';
import CopyButton from '../../../../../Interface/buttons/copyButton/CopyButton';
import Icon from '../../../../../Interface/icons/icon/Icon';
import Fade from '../../../../../Interface/animations/fade/Fade';
import Button from '../../../../../Interface/buttons/button/Button';
import modules from '../../../../../../data/app/modules';
import createRemedyText from '../../../../../Interface/resolution/createRemedyText';
import Page from '../../../../../Interface/page/Page';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import UserContext from '../../../../../context/userContext/UserContext';
import style from './ResolutionSaved.module.css';

function ResolutionSaved(props) {
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const handleOnClickFavorite = async () => {
        const res = await fetcher.updateFavoriteResolutions({
            action: 'add',
            resolution: props.resolution._id
        });

        if(res.ok) {
            userCtx.refresh();
        }
    }

    return (
        <Fade in={true}>
            <Page className={style.ResolutionSaved}>
                <Icon name='check_circle' color='green' size={64}/>
                <Text size={18}>Your resolution was saved!</Text>
                <Text color='grey'>Copy it and paste on the incident field 'Resolution' on Helix</Text>
                <div className={style.buttonsContainer}>
                    <CopyButton 
                        className={style.copyButton} 
                        icon='article'
                        color='blue'
                        text={createRemedyText(props.resolution)} 
                    >Get Helix Text</CopyButton>
                    <Text align='center' size={16} weight={500}>What would you like to do?</Text>
                    <Button
                        icon='add'
                        onClick={props.onStartNewForm}
                    >New Resolution</Button>
                    <Button
                        icon='search'
                        onClick={() => navigate(`${modules('cti tool', 'search').path}?id=${props.resolution._id}&inc=${props.resolution.incident.incident}&resetSettings=true`)}
                    >See the Resolution</Button>
                    <Button
                        icon='star'
                        onClick={handleOnClickFavorite}
                        disabled={fetcher.awaiting.updateFavoriteResolutions}
                    >Add to favorites</Button>
                    {/* <Button
                        // icon='resolution'
                    >Request PBI</Button> */}
                    <Button
                        icon='cti tool'
                        onClick={() => navigate(modules('cti tool').path)}
                    >Back to CTI Tool</Button>
                    {/* <Button
                        // icon='resolution'
                    >Go to Helix</Button> */}
                </div>
            </Page>
        </Fade>
    );
}

export default ResolutionSaved;