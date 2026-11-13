import React, { useEffect, useRef, useState } from 'react';
import style from './Section.module.css';
import Text from '../../../Text/Text';
import Button from '../../../buttons/button/Button';
import Lines from './lines/Lines';
import changeSort from '../functions/changeSort';
import Card from '../../../card/Card';

function Section(props) {
    const [sort, setSort] = useState(props.initialSettings.sort || props.sort || changeSort({type: 'label', order: 0}));
    const [showAllNestedLines, setShowAllNestedLines] = useState(props.initialSettings.showAllNestedLines || props.showAllNestedLines);
    const firstRender = useRef(true);

    useEffect(() => {
        if(props.savedSettings) {
            const sections = props.savedSettings.get('sections') || {};

            sections[props.name] = {
                sort, 
                showAllNestedLines
            };

            props.savedSettings.set('sections', sections);
        }
    }, [sort, showAllNestedLines]);

    useEffect(() => {
        if(!firstRender.current && props.sort) {
            setSort(props.sort);
        }
    }, [props.sort]);

    useEffect(() => {
        if(!firstRender.current) {
            setShowAllNestedLines(props.showAllNestedLines);
        }
    }, [props.showAllNestedLines]);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    const handleOnShowNestedLines = () => {
        setShowAllNestedLines(curSt => !curSt);
    }

    const handleSort = (type, order) => {
        setSort(changeSort({
            type,
            order,
            currentSort: sort
        }));
    }

    const sortLines = (lines) => {
        let field = 'defaultOrder';
        let order = 1;

        if(sort.value.order) {
            field = 'value';
            order = sort.value.order;
        } else if(sort.label.order) {
            field = 'label';
            order = sort.label.order;
        }

        lines.sort((next, cur) => {
            if(next[field] > cur[field]) return 1 * order;
            else if(next[field] < cur[field]) return -1 * order;
            else return 0;
        });

        lines.forEach(line => {
            if(line.lines && line.lines.length) {
                sortLines(line.lines);
            };
        });

        return lines;
    }

    const lines = sortLines(structuredClone(props.lines));

    const hasNestedLines = props.lines.some(line => line.lines && line.lines.length);

    return (
        <Card className={style.Section} shadow>
            <div className={style.header}>
                <Button
                    className={style.name}
                    type='text'
                    color='theme'
                    icon={!sort.label.order? null : sort.label.order === 1? 'arrow_drop_down' : 'arrow_drop_up'}
                    iconPosition='right'
                    tooltip={sort.label.tooltip}
                    onClick={() => handleSort('label')}
                >
                    {props.name}
                </Button>
                <div className={`${style.buttonsContainer} ${hasNestedLines? '' : style.padding}`}>
                    <Text 
                        className={style.headerText}
                        color='grey'
                        size={12}
                        weight={500}
                        align='end'
                    >
                        Volume
                    </Text>
                    <div className={style.buttonWrapper}>
                        <Button
                            type='text'
                            color='grey'
                            textSize={12}
                            icon={!sort.value.order? null : sort.value.order === 1? 'arrow_drop_down' : 'arrow_drop_up'}
                            tooltip={sort.value.tooltip}
                            onClick={() => handleSort('value')}
                        >
                            Total
                        </Button>
                    </div>
                    {hasNestedLines &&
                        <Button 
                            className={`${style.expandButton}`}
                            type='icon'
                            icon={showAllNestedLines? 'unfold_less' : 'unfold_more'}
                            tooltip={showAllNestedLines? 'Collapse' : 'Expand'}
                            onClick={handleOnShowNestedLines}
                        />
                    }
                    
                </div>
            </div>
            <Lines 
                data={lines} 
                showAllNestedLines={showAllNestedLines} 
                setShowAllNestedLines={setShowAllNestedLines}
                volumeBar={props.volumeBar}
                decimal={props.decimal}
            />
        </Card>
    );
}

export default Section;