import React from 'react';
import Rule from '../../rule/Rule';
import Text from '../../Text/Text';
import Warning from '../../warning/Warning';

function ExpirationWarning(props) {
    let showWarning = props.request.status === 'pending' || props.request.status === 'approval in progress' ;

    if(!showWarning) return;

    const today = new Date().getTime();
    const requestDate = new Date(props.request.meta.createdOn).getTime();
    const daysPassed = Math.floor((today - requestDate) / 86400000);

    return (
        <>
            <Rule />
            <Warning centralizeIcon>
                <Text color='grey'>
                    If this request was not responded in
                    <Text span color='grey' weight={700}> {30 - daysPassed} days </Text>
                    , it will be automatically canceled.
                </Text>
            </Warning>
        </>
    );
}

export default ExpirationWarning;