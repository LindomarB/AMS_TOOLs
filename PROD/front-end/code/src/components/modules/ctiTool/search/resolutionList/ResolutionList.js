import React, { useContext, useEffect, useRef, useState } from 'react';
import wordsSplitter from '../../../../../functions/text/wordsSplitter';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import UserContext from '../../../../context/userContext/UserContext';
import useInput from '../../../../hooks/useInput';
import Filters from '../../../../Interface/filters/Filters';
import Header from '../../../../Interface/header/Header';
import DateTimeRangeInput from '../../../../Interface/inputs/dateTimeRangeInput/DateTimeRangeInput';
import TextInput from '../../../../Interface/inputs/textInput/TextInput';
import List from '../../../../Interface/list/List';
import Text from '../../../../Interface/Text/Text';
import Resolution from './resolution/Resolution';
import style from './ResolutionList.module.css';
import SmallResolution from './smallResolution/SmallResolution';
import resolutionFilterSettings from '../../data/resolutionFilterSettings';
import resolutionExportSettings from '../../data/resolutionExportSettings';
import ButtonExportData from '../../../../Interface/buttons/buttonExportData/ButtonExportData';
import useServerData from '../../../../hooks/useServerData';
import IconNavbar from '../../../../Interface/navigation/IconNavbar/IconNavbar';

function ResolutionList(props) {
    const [onlyUserResolutions, setOnlyUserResolutions] = useState(props.settings.get('onlyUserResolutions'));
    const [onlyUserApplications, setOnlyUserApplications] = useState(props.settings.get('onlyUserApplications'));
    const [onlyTeamResolutions, setTeamResolutions] = useState(props.settings.get('onlyTeamResolutions'));
    const [onlyFavorites, setOnlyFavorites] = useState(props.settings.get('onlyFavorites'));
    const [filters, setFilters] = useState([]);
    const [currentFilters, setCurrentFilters] = useState(props.settings.get('currentFilters') || []);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);
    const filtersEl = useRef();
    const firstRender = useRef(true);
    const resolutions = useServerData({
        fetcher: {
            method: 'getResolutions'
        },
        querySettings: {
            projection: {
                'incident.incident': 1,
                'incident.country': 1,
                'incident.application': 1,
                'incident.support group': 1,
                'classification.classification': 1,
                'pbi.number': 1,
                'kba.number': 1,
                'meta.created on': 1
            },
            sort: {
                'meta.created on': -1
            }
        }
    });
    const user = userCtx.user;

    const search = useInput({
        name: 'search', 
        initialValue: props.searchCurrentResolution || props.settings.get('search')
    });
    const period = useInput({
        name: 'period', 
        initialValue: props.settings.get('period')
    });

    useEffect(() => {
        getFilters().then(() => {
            if(firstRender.current) {
                firstRender.current = false;
            }
        });
    }, [onlyUserApplications, onlyUserResolutions, onlyTeamResolutions, onlyFavorites, user]);

    useEffect(() => {
        if(!firstRender.current) {
            resolutions.updateQuery(mountQuery());
        }
    }, [currentFilters, period.value, search.value]);

    useEffect(() => {
        props.settings.update({
            ...props.settings.get(),
            onlyUserResolutions,
            onlyUserApplications,
            onlyTeamResolutions,
            onlyFavorites,
            currentFilters,
            period: period.value,
            search: search.value
        });
    }, [onlyUserApplications, onlyUserResolutions, onlyTeamResolutions, onlyFavorites, currentFilters, period.value, search.value]);

    const getFilters = async () => {
        const query = {};

        if(onlyUserResolutions) query['meta.created by._id'] = user._id;

        if(onlyUserApplications && onlyUserApplications.length) query['incident.application'] = {$in: onlyUserApplications};

        if(onlyFavorites) query._id = {$in: user.settings['cti tool'].favorites};

        if(onlyTeamResolutions && onlyTeamResolutions.length) query['meta.created by._id'] = {$in: onlyTeamResolutions};

        const res = await fetcher.getResolutionFilters({query});

        if(!res.ok) {
            setFilters([]);
            return;
        }
        
        const initialValues = currentFilters.reduce((initialValues, filter) => {
            initialValues[filter.name] = filter.value;
            return initialValues;
        }, {});
console.log(res.data)
        const filters = res.data.map(filter => ({
            ...filter,
            initialValue: initialValues[filter.name],
            max: resolutionFilterSettings[filter.name] && resolutionFilterSettings[filter.name].max
        }));

        setFilters(filters);
    }

    const mountQuery = () => {
        const query = currentFilters.reduce((query, filter) => {
            query[filter.name] = {$in: filter.value};
            return query;
        }, {});

        const $or = wordsSplitter(search.value).
        map(word => ({
            $regex: word,
            $options: 'i'
        })).
        reduce(($or, regex) => {
            $or.push(
                {'incident.incident': regex},
                {'pbi.number': regex},
                {'kba.number': regex}
            );

            return $or;
        }, []);

        if($or.length) {
            query.$or = $or;
        }

        if(period.value && period.value.from || period.value.to) {
            query['meta.created on'] = {};

            if(period.value.from) {
                query['meta.created on'] = {$gte: period.value.from.dateTime}
            }

            if(period.value.to) {
                query['meta.created on'] = {...query['meta.created on'], $lte: period.value.to.dateTime}
            }
        }

        if(onlyUserResolutions) query['meta.created by._id'] = user._id;

        if(onlyUserApplications && onlyUserApplications.length) {
            if(!query['incident.application']) {
                query['incident.application'] = {$in: onlyUserApplications};
            }
        }

        if(onlyFavorites) query._id = {$in: user.settings['cti tool'].favorites};

        if(onlyTeamResolutions && onlyTeamResolutions.length) {
            if(!query['meta.created by._id']) {
                query['meta.created by._id'] = {$in: onlyTeamResolutions};
            }
        }

        return query;
    }

    const refresh = async () => {
        getFilters();
        resolutions.get();
    }

    const showOnlyUserResolutions = () => {
        setOnlyUserResolutions(curSt => !curSt);
        setOnlyUserApplications(false);
        setOnlyFavorites(false);
        setTeamResolutions(false);
    }

    const showOnlyFavorites = () => {
        setOnlyFavorites(curSt => !curSt);
        setOnlyUserResolutions(false);
        setOnlyUserApplications(false);
        setTeamResolutions(false);
    }

    const showOnlyUserApplications = () => {
        if(onlyUserApplications) {
            setOnlyUserApplications(false);
        } else {
            const applications = userCtx.getCTIApplication().map(application => application.name);
            setOnlyUserApplications(applications);
            setOnlyFavorites(false);
            setOnlyUserResolutions(false);
            setTeamResolutions(false);
        }
    }

    const showOnlyTeamResolutions = async () => {
        if(onlyTeamResolutions) {
            setTeamResolutions(false);
        } else {
            const query = {
                $or: [
                    {_id: user._id},
                    {_id: {$in: [user.accountables.map(accountable => accountable._id)]}}
                ]
            };

            if(user.profile.role === 'analyst') {
                const primaryAccountables = user.accountables.reduce((primaryAccountables, accountable) => {
                    if(accountable.primary) primaryAccountables.push(accountable._id);
                    return primaryAccountables;
                }, []);

                query.$or.push({'accountables._id': {$in: primaryAccountables}});
            } else {
                query.$or.push({'accountables._id': user._id});
            }           
    
            const res = await fetcher.getUsers({
                query,
                settings: {
                    projection: {
                        _id: 1
                    }
                }
            });
    
            if(res.ok) {
                const users = res.data.map(user => user._id);
                setTeamResolutions(users);
                setOnlyUserResolutions(false);
                setOnlyUserApplications(false);
                setOnlyFavorites(false);
            }
        }
    }

    const handleOnChangeFilters = (filters) => {
        setCurrentFilters(filters);
        setHasActiveFilters(!!filters.length);
    }

    const handleOpenFilters = () => {
        setOpenFilters(curSt => !curSt);
    }

    const handleOnClearAllFilters = () => {
        filtersEl.current.clearFilters();
        setOnlyUserResolutions(false);
        setOnlyUserApplications(false);
        setTeamResolutions(false);
        setOnlyFavorites(false);
        period.reset();
        search.reset();
    }

    const ListItem = props.expanded? Resolution : SmallResolution;

    const resolutionItems = resolutions.data.map(resolution => {
        const onClick = () => {
            props.setCurrentResolution(resolution._id);
            props.setExpanded(false);
            setOpenFilters(false);
        }

        return (
            <ListItem 
                key={resolution._id}
                data={resolution} 
                active={props.currentResolution === resolution._id}
                onClick={onClick}
            />
        )
    });

    const listHeaderData = props.expanded
        ? [
            'Incident',
            'PBI',
            'KBA',
            'Country',
            'Support Group',
            'Application',
            'Classification',
            'Created On'
        ] : [
            'Incident',
            'Application',
            'Classification'
        ];

    const listHeader = listHeaderData.map(header => (
        <Text 
            key={header} 
            className={style.headerCell} 
            size={12} 
            weight={600}
            ellipsis
        >{header}</Text>
    ));

    const disabled = fetcher.awaiting.getResolutions || fetcher.awaiting.getResolutionFilters;

    const buttonProps = {
        type: 'icon',
        disabled
    };

    const buttons = [
        {
            ...buttonProps,
            icon: 'person',
            tooltip: 'Your resolutions',
            active: onlyUserResolutions,
            onClick: showOnlyUserResolutions,
        },
        {
            ...buttonProps,
            icon: 'team',
            tooltip: `Your team's resolutions`,
            active: !!onlyTeamResolutions,
            onClick: showOnlyTeamResolutions,
        },
        {
            ...buttonProps,
            icon: 'cti application',
            tooltip: 'Your applications',
            active: !!onlyUserApplications,
            onClick: showOnlyUserApplications,
        },
        {
            ...buttonProps,
            icon: 'star',
            tooltip: 'Favorites',
            active: onlyFavorites,
            onClick: showOnlyFavorites,
        },
        {
            ...buttonProps,
            icon: 'filter',
            tooltip: 'Filters',
            active: openFilters || hasActiveFilters,
            onClick: handleOpenFilters,
        },
        {
            ...buttonProps,
            icon: 'clear filters',
            tooltip: 'Clear all filters',
            onClick: handleOnClearAllFilters,
        },
        {rule: true},
        <ButtonExportData
            query={mountQuery}
            exportSettings={resolutionExportSettings}
            fetcherSettings={{
                fileName: 'resolutions',
                awaitingFlag: 'resolution export',
                method: 'exportResolutionData'
            }}
            tooltip='Export results'
            disabled={disabled}
        />,
        {
            ...buttonProps,
            icon: 'refresh',
            tooltip: 'Refresh',
            onClick: refresh, 
        },
        {rule: true},
        {
            type: 'icon',
            style: {transform: 'rotateZ(90deg)'},
            icon: props.expanded? 'unfold_less' : 'unfold_more',
            tooltip: props.expanded? 'Collapse' : 'Expand',
            onClick: () => props.setExpanded(curSt => !curSt),
        }
    ];

    return (
        <div className={style.ResolutionList}>
            <Header className={style.header} text='Search' icon='search' color='theme'>
                <IconNavbar buttons={buttons}/>
            </Header>
            <div className={style.inputsContainer}>
                <TextInput 
                    className={style.search}
                    input={search}
                    uppercase
                    cleanButton
                    confirmButton='search'
                    placeholder='Search for incident, PBI or KBA numbers'
                    disabled={disabled}
                />
                <DateTimeRangeInput 
                    className={props.expanded? null : style.hide}
                    input={period}
                    disabled={disabled}
                />
            </div>
            <header className={`${style.listHeader}`}>
                {listHeader}
            </header>
            <List 
                className={style.list} 
                containerClassName={`${style.listContainer} ${props.expanded? style.expanded : ''}`}
                itemClassName={style.listItem} 
                name='resolution search' 
                loading={disabled} 
                onReachBottom={resolutions.getNext}
                saveScrollPosition
                noBorderRadius
            >
                {resolutionItems}
            </List>
            {filters &&
                <Filters 
                    ref={filtersEl} 
                    filters={filters} 
                    open={openFilters} 
                    setOpen={setOpenFilters} 
                    onChange={handleOnChangeFilters}
                    disabled={fetcher.awaiting.getResolutionFilters}
                />
            }
        </div>
    );
}

export default ResolutionList;