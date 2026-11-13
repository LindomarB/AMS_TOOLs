import React from 'react';
import Icon from '../../../icons/icon/Icon';
import style from './ResolutionProgress.module.css';

function ResolutionProgress(props) {
    const completed = props.progress === 100;
    const progressInDeg = (360 * props.progress) / 100;
    const progressBar = completed
        ? {backgroundColor: `#269926`}
        : {backgroundImage: `conic-gradient(steelblue 0deg, steelblue ${progressInDeg}deg, #DEDEDE ${progressInDeg}deg, #DEDEDE 360deg)`};

    return (
        <div 
            className={style.ResolutionProgress} 
            style={progressBar}
        >
            <div className={style.inside}>
                {completed
                    ? <Icon name='done' size={32} color='green' weight={400}/>
                    : <p>{props.progress}<span>%</span></p>
                }
            </div>
        </div>
    );
}

export default ResolutionProgress;