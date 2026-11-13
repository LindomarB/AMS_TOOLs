import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../../../../Interface/header/Header';
import Button from '../../../../Interface/buttons/button/Button';
import DateTimeRangeInput from '../../../../Interface/inputs/dateTimeRangeInput/DateTimeRangeInput';
import useInput from '../../../../hooks/useInput';
import Rule from '../../../../Interface/rule/Rule';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import Summary from '../../../../Interface/analytics/summary/Summary';
import Page from '../../../../Interface/page/Page';
import Filters from '../../../../Interface/filters/Filters';
import UserContext from '../../../../context/userContext/UserContext';
import resolutionFilterSettings from '../../data/resolutionFilterSettings';
import style from './Overview.module.css';
import resolutionExportSettings from '../../data/resolutionExportSettings';
import ButtonExportData from '../../../../Interface/buttons/buttonExportData/ButtonExportData';
import useSettings from '../../../../hooks/useSettings';

function Overview(props) {
    const settings = useSettings({
        key: 'cti-tool-dashboards-overview'
    });
    const [userStats, setUserStats] = useState(settings.get('userStats'));
    const [teamStats, setTeamStats] = useState(settings.get('teamStats'));
    const [onlyUserApplications, setOnlyUserApplications] = useState(settings.get('onlyUserApplications'));
    const [filters, setFilters] = useState([]);
    const [currentFilters, setCurrentFilters] = useState(settings.get('currentFilters') || []);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    const [openFilters, setOpenFilters] = useState(settings.get('openFilters'));
    const [data, setData] = useState([]);
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const firstRender = useRef(true);
    const user = userCtx.user;

    const period = useInput({
        name: 'period', 
        initialValue: settings.get('period') || {
            from: {date: `${new Date().toISOString().slice(0, 8)}01`},
            to: {date: `${new Date().toISOString().slice(0, 10)}`}
        }
    });
    
    useEffect(() => {
        settings.update({
            userStats,
            teamStats,
            onlyUserApplications,
            currentFilters,
            openFilters,
            period: period.value
        });
    }, [userStats, teamStats, onlyUserApplications, currentFilters, openFilters, period.value]);

    useEffect(() => {
        fetchFilters().then(() => {
            if(firstRender.current) {
                firstRender.current = false;
            }
        });
    }, [onlyUserApplications, userStats, teamStats]);

    useEffect(() => {
        if(!firstRender.current) {
            fetchOverviewData();
        }

    }, [currentFilters, period.value, firstRender.current]);
    
    const fetchOverviewData = async () => {
        const query = mountQuery();
        const settings = {};

        if(user.profile.role === 'analyst') {
            settings.remove = ['By assignee'];
        }

        const res = await fetcher.getCTIDashboard('overview', {query, settings});

        if(res.ok) {
            setData(res.data);
        }
    }

    const fetchFilters = async () => {
        const query = {};

        if(userStats) query['meta.created by._id'] = user._id;

        if(teamStats) query['meta.created by._id'] = {$in: teamStats};

        if(onlyUserApplications && onlyUserApplications.length) query['incident.application'] = {$in: onlyUserApplications};

        const res = await fetcher.getResolutionFilters({query});

        if(!res.ok) {
            setFilters([]);
            return;
        }

        const initialValues = currentFilters.reduce((initialValues, filter) => {
            initialValues[filter.name] = filter.value;
            return initialValues;
        }, {});

        let filters = res.data.map(filter => ({
            ...filter,
            initialValue: initialValues[filter.name],
            max: resolutionFilterSettings[filter.name] && resolutionFilterSettings[filter.name].max
        }));

        if(user.profile.role === 'analyst') {
            filters = filters.filter(filter => filter.label !== 'Assignee');
        }

        setFilters(filters);
    }

    const mountQuery = () => {
        const query = currentFilters.reduce((query, filter) => {
            query[filter.name] = {$in: filter.value};
            return query;
        }, {});

        if(period.value && period.value.from || period.value.to) {
            query['meta.created on'] = {};

            if(period.value.from) {
                query['meta.created on'] = {$gte: period.value.from.dateTime}
            }

            if(period.value.to) {
                query['meta.created on'] = {...query['meta.created on'], $lte: period.value.to.dateTime}
            }
        }

        if(onlyUserApplications && onlyUserApplications.length) {
            if(!query['incident.application']) {
                query['incident.application'] = {$in: onlyUserApplications};
            }
        }

        if(teamStats && teamStats.length) {
            if(!query['meta.created by._id']) {
                query['meta.created by._id'] = {$in: teamStats};
            }
        }

        if(userStats) query['meta.created by._id'] = user._id;

        return query;
    }

    const handleOpenFilters = () => {
        setOpenFilters(curSt => !curSt);
    }

    const handleOnChangeFilters = (filters) => {
        setCurrentFilters(filters);
        setHasActiveFilters(!!filters.length);
    }

    const handleOnShowUserStats = () => {
        setUserStats(curSt => !curSt);
        setTeamStats(false);
        setOnlyUserApplications(false);
    }

    const showOnlyUserApplications = () => {
        if(onlyUserApplications) {
            setOnlyUserApplications(false);
        } else {
            const applications = userCtx.getCTIApplication().map(application => application.name);
            setOnlyUserApplications(applications);
            setUserStats(false);
            setTeamStats(false);
        }
    }

    const handleOnShowThisMonth = () => {
        const timezone = new Date().getTimezoneOffset() * 60000;
        const fromDate = `${new Date().toISOString().slice(0, 8)}01`;
        const nextMonth = new Date(new Date(fromDate).getTime() + timezone + 2678400000);
        const toDate = new Date(new Date(`${nextMonth.getFullYear()}-${nextMonth.getMonth() + 1}-01`).getTime() - 86400000).toISOString().slice(0, 10);

        period.setValue({
            from: {
                date: fromDate,
                dateTime: new Date(new Date(fromDate).getTime() + timezone).toISOString()
            },
            to: {
                date: toDate,
                dateTime: new Date(new Date(toDate).getTime() + timezone + 86400000).toISOString()
            }
        });
    }

    const handleOnShowTeamStats = async () => {
        if(teamStats) {
            setTeamStats(false);
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
                setTeamStats(res.data.map(user => user._id));
                setUserStats(false);
                setOnlyUserApplications(false);
            }
        }
    }

    const handleOnRefresh = () => {
        fetchFilters();
    }

    const handleOnClearFilters = () => {
        setUserStats(false);
        setTeamStats(false);
        setOnlyUserApplications(false);
        setCurrentFilters([]);
    }

    const defaultVisibleSections = [
        'By type',
        'By priority',
        'By country',
        'By application',
        'By support group',
        'By classification',
        'PBI / KBA',
        'Diagnosis matches the problem',
        'Reopening',
        'Used SQL',
        'SLA',
        'Breach reason',
        'By assignee'
    ];

    const disabled = fetcher.awaiting.getResolutions || fetcher.awaiting.getResolutionFilters;

    return (
        <Page className={style.Overview}>
            <div className={style.overviewContainer}>
                <Header text='Overview' rule='strong'>
                    <div className={style.buttonsContainer}>
                        <Button
                            type='icon'
                            icon='person'
                            tooltip='Your statistics'
                            active={userStats}
                            onClick={handleOnShowUserStats}
                            disabled={disabled}
                        />
                         <Button
                            type='icon'
                            icon='cti application'
                            tooltip='Your applications'
                            active={!!onlyUserApplications}
                            onClick={showOnlyUserApplications}
                            disabled={disabled}
                        />
                        <Button
                            type='icon'
                            icon='team'
                            tooltip={`Your team statistics`}
                            active={!!teamStats}
                            onClick={handleOnShowTeamStats}
                            disabled={disabled}
                        />
                        <Button
                            type='icon'
                            icon='today'
                            tooltip='This month'
                            onClick={handleOnShowThisMonth}
                        />
                        <Button
                            type='icon'
                            icon='filter'
                            tooltip='Filters'
                            active={openFilters || hasActiveFilters}
                            onClick={handleOpenFilters}
                            disabled={disabled}
                        />
                        <Button
                            type='icon'
                            icon='clear filters'
                            tooltip='Clear filters'
                            onClick={handleOnClearFilters}
                            disabled={!hasActiveFilters && !userStats && !teamStats && !onlyUserApplications}
                        />
                        <Rule className={style.rule} vertical/>
                        <ButtonExportData 
                            query={mountQuery}
                            exportSettings={resolutionExportSettings}
                            fetcherSettings={{
                                fileName: 'overview resolutions',
                                awaitingFlag: 'overview export',
                                method: 'exportResolutionData'
                            }}
                            tooltip='Export dashboard data'
                            disabled={disabled}
                        />
                        <Button
                            type='icon'
                            icon='refresh'
                            tooltip='Refresh'
                            onClick={handleOnRefresh}
                            disabled={disabled}
                        />
                    </div>
                    <DateTimeRangeInput 
                        input={period}
                    />
                </Header>
                <Summary 
                    name='cti-tool-dashboards-overview'
                    header='Resolutions'
                    data={data} 
                    defaultVisibleSections={defaultVisibleSections}
                />
            </div>
            <Filters 
                filters={filters} 
                open={openFilters} 
                setOpen={setOpenFilters} 
                noOverlap
                onChange={handleOnChangeFilters}
                disabled={fetcher.awaiting.getResolutionFilters}
            />
        </Page>
    );
}

export default Overview;