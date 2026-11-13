import React, { useEffect, useState } from "react";
import Timeline from "../../timeline/Timeline";

function FormTimeline(props) {
    const [timeline, setTimeline] = useState(null);

    useEffect(() => {
        if(props.form) {
            props.form.setTimelineUpdater(() => setTimeline);
        }
    }, [props.form]);

    if(!timeline) {
        return null;
    }
    
    return (
        <Timeline 
            {...timeline}
        />
    );
}

export default FormTimeline;