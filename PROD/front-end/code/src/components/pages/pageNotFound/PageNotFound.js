import React from 'react';
import style from './PageNotFound.module.css';
import Text from '../../Interface/Text/Text';
import Button from '../../Interface/buttons/button/Button';
import { useNavigate } from 'react-router-dom';
import modules from '../../../data/app/modules';
import Icon from '../../Interface/icons/icon/Icon';

function PageNotFound(props) {
    const navigate = useNavigate();

    return (
        <div className={style.PageNotFound}>
            <Icon name='not_listed_location' size={96} weight={200} color='icon' filled/>
            <Text size={24} weight={600} color='icon'>Page not found</Text>
            <Text className={style.text} weight={500}>The page you are trying to reach may have moved or the address may be incorrect</Text>
            <Button 
                icon='home'
                onClick={() => navigate(modules('home').path)}
            >
                Back to Home
            </Button>
        </div>
    );
}

export default PageNotFound;