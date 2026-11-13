import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../components/context/appContext/AppContext';
import Button from '../../../components/Interface/buttons/button/Button';
import UnderlineMenu from '../../../components/Interface/underlineMenu/UnderlineMenu';
import style from './UnderlineSubmenu.module.css';

function UnderlineSubmenu(props) {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();

    return (
            <div className={style.UnderlineSubmenu}>
                <UnderlineMenu
                    className={`${style.underlineMenu} ${props.className || ''}`}
                    underlineClassName={`${style.underline} ${props.underlineClassName || ''}`}
                    items={props.items}
                />
                {props.backPath &&
                    <Button 
                        icon={appCtx.icons.leftArrow}
                        onClick={() => navigate(props.backPath)}
                    />
                }
            </div>
    );
}

export default UnderlineSubmenu;