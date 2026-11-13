import React from 'react';
import ListItem from '../../list/listItem/ListItem';
import ResolutionProgress from './resolutionProgress/ResolutionProgress';
import style from './Resolution.module.css';

function Resolution(props) {
    const getProgress = () => {
        let totalFields = 0;
        let completedFields = 0;
    
        for(let field in props.data) {
            if(props.data[field]) completedFields++;
            totalFields++;
        }
    
        return +((completedFields / totalFields) * 100).toFixed(0);
    }
    
    const progress = getProgress();
    const icon = <ResolutionProgress progress={progress}/>;
    const {application, classification, pbi} = props.data;
    const text = (
        <span className={style.text}>
            <span>{application || '-'}</span>
            <span>{classification || '-'}</span>
            <span>{pbi || '-'}</span>
        </span>
    );

    return (
        <ListItem 
            onClick={props.onClick} 
            icon={icon} 
            title={props.data.incident} 
            rightText={progress === 100? 'Complete' : 'In Progress'}
            text={text}
        />
    );
}

export default Resolution;