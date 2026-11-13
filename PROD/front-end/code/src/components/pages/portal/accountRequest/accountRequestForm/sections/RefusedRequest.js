import React from 'react';
import RequestResponse from '../../requestResponse/RequestResponse';

function RefusedRequest(props) {
    if(props.res) {
        return <RequestResponse res={props.res} />;
    } else {
        return null;
    }
}

RefusedRequest.defaultProps = {
    name: 'refused request',
    readOnly: true,
    condition: (_, conditions) => conditions.prevRefusedRequest
}

export default RefusedRequest;