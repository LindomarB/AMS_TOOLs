import React, { useContext, useEffect, useRef, useState } from "react";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import Button from "../../../../Interface/buttons/button/Button";
import Header from "../../../../Interface/header/Header";
import List from "../../../../Interface/list/List";
import Filters from "../../../../Interface/filters/Filters";
import useSettings from "../../../../hooks/useSettings";
import useServerData from "../../../../hooks/useServerData";
import TextInput from "../../../../Interface/inputs/textInput/TextInput";
import useInput from "../../../../hooks/useInput";
import wordsSplitter from "../../../../../functions/text/wordsSplitter";
import User from "../../../../Interface/listItems/user/User";
import ModalContext from "../../../../context/modalContext/ModalContext";
import AddMember from "./addMember/AddMember";
import IconNavbar from "../../../../Interface/navigation/IconNavbar/IconNavbar";
import style from './TeamMembersList.module.css';
import Help from "../../../../Interface/help/Help";
import teamHelp from "../../data/help/teamHelp";

function TeamMembersList(props) {
    const settings = useSettings({
        key: 'manage-team-page-settings',
        storageType: 'session'
    });
    const [onlyDirectMembers, setOnlyDirectMembers] = useState(false);
    const [filters, setFilters] = useState([]);
    const [openFilters, setOpenFilters] = useState(false);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    const [currentFilters, setCurrentFilters] = useState(settings.get('currentFilters') || []);
    const filtersEl = useRef();
    const firstRender = useRef(true);
    const supportGroupsApplications = useRef({});
    const fetcher = useContext(FetcherContext);
    const modalCtx = useContext(ModalContext);
    const members = useServerData({
        fetcher: {
            method: 'getUsers'
        },
        querySettings: {
            projection: {
                'profile.name': 1,
                'profile.email': 1,
                'profile.role': 1,
                'status': 1,
                'settings.profile': 1,
                ...props.projection || {}
            },
            sort: {
                'profile.name': 1
            },
            limit: 20
        },
        keysets: {'profile.name': '$gt'}
    });

    const search = useInput({
        name: 'search',
        initialValue: settings.get('search') || ''
    });

    useEffect(() => {
        getFilters().then(() => {
            if(firstRender.current) {
                firstRender.current = false;
            }
        });
    }, [onlyDirectMembers]);

    useEffect(() => {
        if(!firstRender.current) {
            members.updateQuery(mountQuery());
        }
    }, [currentFilters, search.value, onlyDirectMembers]);

    useEffect(() => {
        settings.update({
            ...settings.get(),
            currentFilters,
            onlyDirectMembers,
            search: search.value
        });
    }, [currentFilters, search.value, onlyDirectMembers]);

    const getFilters = async () => {
        const query = {};

        if(onlyDirectMembers) {
            query.accountables = {$elemMatch: {_id: props.user._id, primary: {$exists: true}}}
        } else {
            query['accountables._id'] = props.user._id;
        }

        const res = await fetcher.getUserFilters({query});

        if(!res.ok || !res.data.length) {
            setFilters([]);
            return;
        }

        const initialValues = currentFilters.reduce((initialValues, filter) => {
            initialValues[filter.name] = filter.value;
            return initialValues;
        }, {});

        const filters = res.data.map(filter => ({
            ...filter,
            initialValue: initialValues[filter.name]
        }));

        const supportGroup = filters.find(filter => filter.name === 'settings.cti tool.applications.support group');

        if(supportGroup) {
            supportGroup.options = supportGroup.options.map(option => ({
                ...option,
                value: option.value.join(',')
            }));
        }

        setFilters(filters);
    }   

    const mountQuery = () => {
        const query = currentFilters.reduce((query, filter) => {
            query[filter.name] = {$in: filter.value};
            return query;
        }, {});

        if(!query['accountables._id']) {
            query['accountables._id'] = props.user._id;
        } else {
            query.$and = [
                {'accountables._id': props.user._id},
                {'accountables._id': query['accountables._id']}
            ];
    
            delete query['accountables._id'];
        }

        const names = search.value? wordsSplitter(search.value) : [];
        
        if(names.length) {
            query.$or = [];
            names.forEach(name => query.$or.push(
                {'profile.name': {$regex: name, $options: 'i'}},
                {'profile.email': {$regex: name, $options: 'i'}},
                {'profile.cargillId': {$regex: name, $options: 'i'}}
            ));
        }

        if(onlyDirectMembers) {
            query.accountables = {$elemMatch: {_id: props.user._id, primary: {$exists: true}}}
        }
        
        if(query['settings.cti tool.applications.support group']) {
            const applications = query['settings.cti tool.applications.support group'].$in.join(',').split(',');

            if(query['settings.cti tool.applications']) {
                applications.push(...query['settings.cti tool.applications'].$in);
            }

            query['settings.cti tool.applications'] = {$in: applications};

            delete query['settings.cti tool.applications.support group'];
        }

        return query;
    }

    const handleOnChangeFilters = (filters) => {
        const supportGroups = filters.find(filter => filter.name === 'support group');

        if(supportGroups) {
            filters = filters.filter(filter => filter.name !== 'support group');

            const applications = supportGroups.value.reduce((applications, supportGroup) => {
                applications.push(...supportGroupsApplications.current[supportGroup]);
                return applications;
            }, []);

            const applicationFilter = filters.find(filter => filter.name === 'application');

            if(applicationFilter) {
                applicationFilter.value.push(...applications);
            } else {
                filters.push({
                    name: 'application',
                    value: applications
                });
            }
        }

        setCurrentFilters(filters);
        setHasActiveFilters(!!filters.length);
    }

    const showOnlyDirectMembers = () => {
        setOnlyDirectMembers(curSt => !curSt);
    }

    const refresh = async () => {
        getFilters();
        members.get();
    }

    const handleOpenFilters = () => {
        setOpenFilters(curSt => !curSt);
    }

    const handleOnClearAllFilters = () => {
        filtersEl.current.clearFilters();
        search.reset();
    }

    const handleOnAddMember = () => {
        modalCtx.show(
            <AddMember refreshData={refresh}/>
        );
    }

    const handleOnBlur = (value) => {
        if(!value) search.reset();
    }

    const items = members.data.map(member => (
        <User 
            key={member._id} 
            user={member} 
            onClick={props.onClickMember? () => props.onClickMember(member) : null}
        />
    ));

    const disabled = fetcher.awaiting.getUsers || fetcher.awaiting.getUserFilters;

    const buttons = [
        {
            icon: 'directly accountable',
            tooltip: 'Show only direct members',
            active: onlyDirectMembers,
            onClick: showOnlyDirectMembers,
            disabled: disabled,
        },
        {
            icon: 'filter',
            tooltip: 'Filters',
            active: openFilters || hasActiveFilters,
            onClick: handleOpenFilters,
            disabled: disabled,
        },
        {
            color: 'grey',
            icon: 'clear filters',
            tooltip: 'Clear all filters',
            onClick: handleOnClearAllFilters,
            disabled: disabled,
        },
        {rule: true},
        {
            icon: 'refresh',
            onClick: refresh,
            tooltip: 'Refresh data',
        },
        {rule: true},
        <Help content={Object.values(teamHelp)}/>
    ];

    return (
        <div className={style.TeamMembersList}>
            {(props.header || props.headerProps) &&
                <Header text={props.header} {...props.headerProps}>
                    <IconNavbar buttons={buttons}/>
                </Header>
            }
            <div className={style.inputsContainer}>
                <TextInput
                    className={style.filter}
                    input={search}
                    cleanButton
                    confirmButton='search'
                    placeholder='Search for a member (name, e-mail or ID)'
                    disabled={disabled}
                    onBlur={handleOnBlur}
                />
                {!props.accountableView &&
                    <Button
                        icon='add user'
                        onClick={handleOnAddMember}
                    >Add Member</Button>
                }
            </div>
            <List 
                className={style.list} 
                name={props.name}
                noDataIcon='no team'
                noDataMessage='No members found'
                saveScrollPosition
                onReachBottom={members.getNext}
            >
                {items}
            </List>
            {filters && 
                <Filters 
                    ref={filtersEl} 
                    open={openFilters} 
                    setOpen={setOpenFilters} 
                    filters={filters} 
                    onChange={handleOnChangeFilters}
                />
            }
        </div>
    );
}

TeamMembersList.defaultProps = {
    query: {},
    headerProps: {}
}

export default TeamMembersList;