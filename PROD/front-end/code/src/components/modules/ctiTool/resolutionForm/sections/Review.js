import React from 'react';
import Resolution from '../../../../Interface/resolution/Resolution';

function Review(props) {
    const handleOnEditSection = (section) => {
        props.changeSection(section);
    }   

    const resolution = props.form.getValues(true);

    return (
        <Resolution resolution={resolution} enableEdit={true} onEditSection={handleOnEditSection}/> 
    );
}

Review.defaultProps = {
    name: 'review',
    subtitle: 'Review your resolution before save it',
    readOnly: true
};

export default Review;