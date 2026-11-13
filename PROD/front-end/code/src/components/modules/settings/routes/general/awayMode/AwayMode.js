import React from 'react';
import ActivateAwayMode from './activateAwayMode/ActivateAwayMode';
import DeactivateAwayMode from './deactivateAwayMode/DeactivateAwayMode';

function AwayMode(props) {
    const componentProps = {
        user: props.user,
        refreshUser: props.refreshUser
    }

    if(props.user.settings.awayMode) {
        return <DeactivateAwayMode {...componentProps} />
    } else {
        return <ActivateAwayMode {...componentProps}/>
    }
}

export default AwayMode;