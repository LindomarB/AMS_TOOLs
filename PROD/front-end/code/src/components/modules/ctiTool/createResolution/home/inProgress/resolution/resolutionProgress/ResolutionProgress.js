import React from 'react';
import style from './ResolutionProgress.module.css';
import Icon from '../../../../../../../Interface/icons/icon/Icon';

function ResolutionProgress(props) {
    const inProgress = props.progress > -1 ;
    const progressInDeg = (360 * props.progress) / 100;
    const progressBar = inProgress
        ? {backgroundImage: `conic-gradient(steelblue 0deg, steelblue ${progressInDeg}deg, #DEDEDE ${progressInDeg}deg, #DEDEDE 360deg)`}
        : {backgroundColor: `#269926`};

    return (
        <div 
            className={style.ResolutionProgress} 
            style={progressBar}
        >
            <div className={style.inside}>
                {inProgress
                    ? <p>{props.progress}<span>%</span></p>
                    : <Icon name='done' size={32} color='green' weight={400}/>
                }
            </div>
        </div>
    );
}

export default ResolutionProgress;