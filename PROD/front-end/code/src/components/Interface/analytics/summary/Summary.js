import React, { useEffect, useState } from 'react';
import Card from '../../card/Card';
import Section from './section/Section';
import style from './Summary.module.css';
import Text from '../../Text/Text';
import Button from '../../buttons/button/Button';
import PopBox from '../../popBox/PopBox';
import changeSort from './functions/changeSort';
import CheckBox from '../../inputs/checkBox/CheckBox';
import useInput from '../../../hooks/useInput';
import useSettings from '../../../hooks/useSettings';

function Summary(props) {
    const settings = useSettings({
        key: `summary-settings-for-${props.name}`,
        initialValue: {
            sections: {}
        }
    });
    const [sort, setSort] = useState(settings.get('sort') || changeSort({type: 'label', order: 0}));
    const [decimal, setDecimal] = useState(settings.get('decimal') || 0);
    const [showAllNestedLines, setShowAllNestedLines] = useState(settings.get('showAllNestedLines') || false);
    const [visibleSectionsOptions, setVisibleSectionsOptions] = useState(settings.get('visibleSectionsOptions') || []);

    const volumeBar = useInput({
        name: 'volumeBar', 
        initialValue: settings.get('volumeBar') || ['Main lines']
    });

    const visibleSections = useInput({
        name: 'visibleSections', 
        initialValue: settings.get('visibleSections') || props.defaultVisibleSections || []
    });

    useEffect(() => {
        if(!props.name) {
            settings.clear();
        }
    }, []);

    useEffect(() => {
        if(props.name) {
            settings.update({
                ...settings.get(),
                sort,
                decimal,
                showAllNestedLines,
                visibleSectionsOptions,
                volumeBar: volumeBar.value,
                visibleSections: visibleSections.value
            });
        }
    }, [sort, decimal, showAllNestedLines, visibleSectionsOptions, volumeBar.value, visibleSections.value]);

    useEffect(() => {
        if(props.data) {
            setVisibleSectionsOptions(props.data.map(section => section.name));
        }
    }, [props.data]);

    const handleSort = (type, order) => {
        const sections = settings.get('sections');

        for(let section in sections) {
            delete sections[section].sort;
        }

        settings.set('sections', sections);

        setSort(changeSort({
            type,
            order,
            currentSort: sort
        }));
    }

    const handleDecimal = () => {
        setDecimal(curSt => {
            if(curSt === 2) return 0;
            else return curSt + 1;
        });
    }

    const handleOnShowNestedLines = () => {
        const sections = settings.get('sections');

        for(let section in sections) {
            delete sections[section].showAllNestedLines;
        }

        settings.set('sections', sections);
        setShowAllNestedLines(curSt => !curSt);
    }

    const setLinesDefaultOrder = (lines) => {
        lines.forEach((line, idx) => {
            if(!line) return;

            line.defaultOrder = idx;

            if(line.lines) setLinesDefaultOrder(line.lines);
        });
    }

    const savedSettings = props.name && settings.get();
    const sections = props.data.reduce((sections, section, idx) => {
        if(
            visibleSections.value.includes(section.name) && 
            section.lines &&
            section.lines.length
        ) {
            setLinesDefaultOrder(section.lines);

            const sectionSettings = savedSettings && savedSettings.sections && savedSettings.sections[section.name];

            sections.push(
                <Section 
                    key={`${section.name}-${idx}`} 
                    {...section}
                    initialSettings={sectionSettings || {}}
                    savedSettings={props.name && settings}
                    sort={sort}
                    showAllNestedLines={showAllNestedLines}
                    volumeBar={{
                        main: volumeBar.value.includes('Main lines'),
                        secondary: volumeBar.value.includes('Secondary lines')
                    }}
                    decimal={decimal}
                />
            );
        }

        return sections;
    }, []);

    return (
        <div className={style.Summary}>
            <div className={style.header}>
                <Text size={16} weight={500}>{props.header}</Text>
                <div className={style.textContainer}>
                    <Button 
                        type='icon'
                        icon='sort_by_alpha'
                        activeIconProps={{weight: 400}}
                        tooltip={sort.label.tooltip}
                        active={sort.label.order}
                        onClick={() => handleSort('label')}
                        hideTooltipOnClick={false}
                    />
                    <Button 
                        type='icon'
                        icon='sort'
                        activeIconProps={{weight: 400}}
                        tooltip={sort.value.tooltip}
                        active={sort.value.order}
                        onClick={() => handleSort('value')}
                        hideTooltipOnClick={false}
                    />
                    <PopBox
                        className={style.popBox}
                        horizontalAlign='right'
                        button={{
                            type: 'icon',
                            icon: 'leaderboard',
                            tooltip: 'Volume bars'
                        }}
                    >
                        <CheckBox 
                            input={volumeBar}
                            options={['Main lines', 'Secondary lines']}
                        />
                    </PopBox>
                    <Button 
                        type='icon'
                        icon={decimal === 2? 'decimal_decrease' : 'decimal_increase'}
                        tooltip={decimal === 2? 'Disable decimal' : 'Increase decimal'}
                        onClick={handleDecimal}
                        hideTooltipOnClick={false}
                    />
                    <PopBox
                        className={style.popBox}
                        horizontalAlign='right'
                        button={{
                            type: 'icon',
                            icon: 'table_rows',
                            tooltip: 'Choose sections'
                        }}
                    >
                        <CheckBox
                            input={visibleSections}
                            options={visibleSectionsOptions}
                        />
                    </PopBox>
                    <Button 
                        type='icon'
                        icon={showAllNestedLines? 'unfold_less' : 'unfold_more'}
                        tooltip={showAllNestedLines? 'Collapse' : 'Expand'}
                        onClick={handleOnShowNestedLines}
                        hideTooltipOnClick={false}
                    />
                </div>
            </div>
            <div className={style.sections}>
                {sections.length
                    ? sections
                    : <Text color='grey'>No data was found</Text>
                }
            </div>
        </div>
    );
}

export default Summary;