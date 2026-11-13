import React, { Fragment, useEffect, useState } from 'react';
import Text from '../../../../Text/Text';
import style from './Lines.module.css';
import Icon from '../../../../icons/icon/Icon';

function Line(props) {
    const [showNestedLines, setShowNestedLines] = useState(props.lines && !!props.lines.length && props.showAllNestedLines);

    useEffect(() => {
        if(props.lines && !!props.lines.length) {
            setShowNestedLines(props.showAllNestedLines);
        }
    }, [props.showAllNestedLines]);

    const handleOnShowNestedLines = () => {
        setShowNestedLines(curSt => !curSt);
    }

    const hasNestedLines = props.lines && !!props.lines.length;
    const showVolumeBar = (!props.nested && props.volumeBar.main) || (props.nested && props.volumeBar.secondary)

    return (
        <Fragment>
            <div 
                className={`${style.line} ${hasNestedLines? style.hasNestedLines : ''} ${showNestedLines? style.showingNestedLines : ''}`} 
                onClick={hasNestedLines? handleOnShowNestedLines : null}
            >
                <Text className={style.label} size={14} weight={showNestedLines? 600 : 500} ellipsis>{props.label}</Text>
                {(props.percentage) && 
                    <div className={style.percentageContainer}>
                        {showVolumeBar &&
                            <div className={style.percentageBar}>
                                <div className={style.background}></div>
                                <div className={style.bar} style={{width: `${props.percentage}%`}}></div>
                            </div>
                        }
                        <Text 
                            className={style.percentage} 
                            color='grey' 
                            size={12} 
                            align='end'
                        >
                            {`${(+props.percentage).toFixed(props.decimal)}%`}
                        </Text>
                    </div>
                }
                <Text className={style.value} size={14} weight={600} align='end' ellipsis>{props.value}</Text>
                <Icon 
                    className={`${style.icon} ${hasNestedLines? '' : style.hideIcon}`}
                    name={showNestedLines? 'expand_less' : 'expand_more'} 
                    size={16} 
                    weight={400}
                />
            </div>
            {(showNestedLines && hasNestedLines) &&
                <Lines 
                    data={props.lines} 
                    nested 
                    showAllNestedLines={props.showAllNestedLines} 
                    volumeBar={props.volumeBar} 
                    decimal={props.decimal}
                />
            }
        </Fragment>
    );
}

function Lines(props) {
    const lines =  props.data.map((line, idx) => (
        <Line 
            key={`line-${idx}`} 
            {...line} 
            showAllNestedLines={props.showAllNestedLines}
            nested={props.nested}
            volumeBar={props.volumeBar}
            decimal={props.decimal}
            test={props.test}
        />
    ));

    return (
        <div className={`${style.Lines} ${props.nested? style.nested : ''}`}>
            {lines}
        </div>
    );
}

export default Lines;