import React from 'react';
import Fade from '../../../../../Interface/animations/fade/Fade';
import DotLoader from '../../../../../Interface/dotLoader/DotLoader';
import Icon from '../../../../../Interface/icons/icon/Icon';
import Page from '../../../../../Interface/page/Page';
import Text from '../../../../../Interface/Text/Text';
import style from './Saving.module.css';

function Saving(props) {
    return (
        <Fade in={!props.saved}>
            <Page className={style.Saving}>
                <Icon className={`${style.icon} ${props.saved? style.exit : ''}`} name='save' color='blue' size={64}/>
                <div className={style.text}>
                    <Text size={18}>Saving your resolution</Text>
                    <DotLoader color='grey' size={4} gap={4}/>
                </div>
            </Page>
        </Fade>
    );
}

export default Saving;