import React, { useContext, useEffect, useRef, useState } from 'react';
import wordsSplitter from '../../../../functions/text/wordsSplitter';
import AppContext from '../../../context/appContext/AppContext';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import useInput from '../../../hooks/useInput';
import Button from '../../../Interface/buttons/button/Button';
import Filters from '../../../Interface/filters/Filters';
import Header from '../../../Interface/header/Header';
import TextInput from '../../../Interface/inputs/textInput/TextInput';
import List from '../../../Interface/list/List';
import DataExport from '../../../Interface/modal/appModals/dataExport/DataExport';
import Rule from '../../../Interface/rule/Rule';
import Application from './application/Application';
import style from './ApplicationList.module.css';
import useServerData from '../../../hooks/useServerData';
import applicationCatalogExportSettings from '../data/applicationCatalogExportSettings';
import UserContext from '../../../context/userContext/UserContext';

function ApplicationList(props) {
    const [onlyUserApplications, setOnlyUserApplications] = useState(props.settings.get('onlyUserApplications'));
    const [filters, setFilters] = useState([]);
    const [currentFilters, setCurrentFilters] = useState(props.settings.get('currentFilters') || []);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const appCtx = useContext(AppContext);
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const filtersEl = useRef();
    const applications = useServerData({
        fetcher: {
            method: 'getApplicationCatalog'
        },
        querySettings: {
            projection: {
                name: 1,
                country: 1,
                'support group': 1,
                status: 1
            },
            sort: {name: 1},
        },
        keysets: {name: '$gt'}
    });

    const applicationName = useInput({
        name: 'applicationName', 
        initialValue: props.settings.get('applicationName')
    });

    useEffect(() => {
        getFilters();
    }, [onlyUserApplications]);

    useEffect(() => {
        applications.updateQuery(mountQuery());
    }, [currentFilters, applicationName.value]);

    useEffect(() => {
        props.settings.update({
            ...props.settings.get(),
            currentFilters,
            onlyUserApplications,
            applicationName: applicationName.value
        });
    }, [currentFilters, onlyUserApplications, applicationName.value]);

    const getFilters = async () => {
        const query = {};

        if(onlyUserApplications && onlyUserApplications.length) query.name = {$in: onlyUserApplications};

        const res = await fetcher.getApplicationCatalogFilters({query});
        
        if(!res.ok) {
            setFilters([]);
            return;
        }

        const initialValues = currentFilters.reduce((initialValues, filter) => {
            initialValues[filter.name] = filter.value;
            return initialValues;
        }, {});

        if(!res.ok) {
            setFilters([]);
            return;
        }

        const filters = res.data.map(filter => ({
            ...filter,
            initialValue: initialValues[filter.name],
            max: 10
        }));
        
        setFilters(filters);
    }

    const mountQuery = () => {
        const query = currentFilters.reduce((query, filter) => {
            query[filter.name] = {$in: filter.value};
            return query;
        }, {});

        const $or = wordsSplitter(applicationName.value).
        map(word => ({
            $regex: word,
            $options: 'i'
        })).
        reduce(($or, regex) => {
            $or.push(
                {'name': regex}
            );

            return $or;
        }, []);

        if($or.length) {
            query.$or = $or;
        }

        if(onlyUserApplications && onlyUserApplications.length) {
            if(!query.name) {
                query.name = {$in: onlyUserApplications};
            }
        }
        
        return query;
    }

    const refresh = async () => {
        getFilters();
    }

    const showOnlyUserApplications = () => {
        if(onlyUserApplications) {
            setOnlyUserApplications(false);
        } else {
            const applications = userCtx.getCTIApplication().map(application => application.name);
            setOnlyUserApplications(applications);
        }
    }

    const handleOnChangeFilters = (filters) => {
        setCurrentFilters(filters);
        setHasActiveFilters(!!filters.length);
    }

    const handleOpenFilters = () => {
        setOpenFilters(curSt => !curSt);
    }

    const handleOnClearFilters = () => {
        filtersEl.current.clearFilters();
        applicationName.reset();
        setOnlyUserApplications(false);
    }

    const handleOnExportData = () => {
        const onExport = async (exportSettings) => {
            const query = {
                query: mountQuery(),
                settings: {
                    export: exportSettings
                }
            };

            const settings = {
                fileName: `applications ${new Date().toLocaleDateString()}`,
                awaitingFlag: 'application export'
            };

            const res = await fetcher.exportApplicationCatalogData(query, settings);

            if(res.ok) {
                appCtx.closeModal();
            }
        }

        appCtx.showModal(
            <DataExport
                settings={applicationCatalogExportSettings}
                onExport={onExport}
            />
        );
    }

    const applicationItems = applications.data.map(application => {
        const onClick = () => {
            props.setCurrentApplication(application._id);
            setOpenFilters(false);
        }

        return (
            <Application 
                key={application._id}
                data={application} 
                active={props.currentApplication === application._id}
                onClick={onClick}
            />
        )
    });

    const disabled = fetcher.awaiting.getApplicationCatalog || fetcher.awaiting.getApplicationCatalogFilters;

    return (
        <div className={style.ApplicationList}>
            <Header className={style.header} text='Search' icon='search' color='theme'>
                {userCtx.user.accesses.includes('cti tool') &&  
                    <Button
                        type='icon'
                        icon='cti application'
                        tooltip='Your applications'
                        active={!!onlyUserApplications}
                        onClick={showOnlyUserApplications}
                        disabled={disabled}
                    />
                }
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
                    color='grey'
                    icon='clear filters'
                    tooltip='Clear filters'
                    onClick={handleOnClearFilters}
                    disabled={disabled}
                />
                <Rule className={style.rule} vertical/>
                <Button
                    type='icon'
                    icon='download'
                    tooltip='Export Results'
                    onClick={handleOnExportData}
                    disabled={disabled}
                />
                <Button
                    type='icon'
                    icon='refresh'
                    tooltip='Refresh'
                    onClick={refresh}
                    disabled={disabled}
                />
            </Header>
            <div className={style.inputsContainer}>
                <TextInput
                    className={style.search}
                    input={applicationName}
                    cleanButton
                    confirmButton='search'
                    placeholder='Search for an application'
                    disabled={disabled}
                />
                
            </div>
            <List
                className={style.list} 
                containerClassName={style.listContainer} 
                itemClassName={style.listItem} 
                name='Application Catalog' 
                loading={disabled} 
                saveScrollPosition
                noBorderRadius
                onReachBottom={applications.getNext}
            >
                {applicationItems}
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

export default ApplicationList;