import React, { useState } from 'react';
import Warning from '../../warning/Warning';
import Button from '../../buttons/button/Button';
import style from './FormWarning.module.css';

function FormWarning(props) {
    const [show, setShow] = useState(true);

    const toggleWarning = () => {
        setShow(curSt => !curSt);
    }

    return (
        <div 
            className={`${style.FormWarning} ${props.border? style.border : ''} ${show? '' : style.hiding}`} 
            onClick={show? null : toggleWarning}
        >
            <Button 
                className={`${style.button} ${show?  '' : style.hiding}`}
                type='icon'
                icon={show? 'expand_less' : 'expand_more'}
                onClick={show? toggleWarning : null}
            />
            {show
                ? (
                    <Warning 
                        title
                        {...props}
                        className={`${style.warning}  ${props.className || ''}`} 
                    />
                )
                : (
                    <Warning 
                        className={`${style.warning} ${style.hide} ${props.border? style.border : ''}`} 
                        title={props.title || true}
                        border={props.border}
                        header
                        headerText={{size: 12, weight: 700}}
                        iconProps={{
                            ...props.iconProps || {},
                            size: 20
                        }}
                    />
                )
            }
        </div>
    );
}

export default FormWarning;