import React, { useContext } from 'react';
import Button from '../../../Interface/buttons/button/Button';
import AppContext from '../../../context/appContext/AppContext';

function CopyButton(props) {
    const appCtx = useContext(AppContext);

    const handleOnClick = () => {
        navigator.clipboard.writeText(props.text);
        appCtx.notify({
            message: 'Text copied!',
            icon: 'copy',
            settings: {
                bgColor: 'blue',
                color: 'white'
            }
        });
    }
    
    const buttonProps = structuredClone(props);
    delete buttonProps.text;

    return (
        <Button
            icon='copy'
            {...buttonProps}
            onClick={handleOnClick}
        />
    );
}

export default CopyButton;