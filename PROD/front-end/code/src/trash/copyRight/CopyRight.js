import React, { useContext } from 'react';
import AppContext from '../../components/context/appContext/AppContext';
import style from './CopyRight.module.css';

function CopyRight(props) {
    const appCtx = useContext(AppContext);
    const lexicon = appCtx.lexicon.theme.about;

    const currentYear = new Date().getFullYear();

    return (
        <div className={`${style.CopyRight} ${props.className || ''}`}>
            <a href='https://www.wipro.com' target='_blank'>
                <img className={style.logo} src={'/images/wipro-logo.svg'}/>
            </a>
            <small>{`${lexicon.developedBy} Wipro`}</small>
            <small> 
                &#169;{`${currentYear} AMS Tools`} - {`${lexicon.rights}`}
            </small>
        </div>
    );
}

export default CopyRight;