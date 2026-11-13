import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetcherContext from "../../context/fetcherContext/FetcherContext";
import capitalize from "../../../functions/text/capitalize";
// import useNewBrowserStorage from "../../hooks/useNewBrowserStorage";
import useSearch from "../../hooks/useSearch";
import Button from "../buttons/button/Button";
import Header from "../header/Header";
import Search from "../inputs/search/Search";
import List from "../list/List";
import TeamMember from "./teamMember/TeamMember";
import style from './TeamMembersList.module.css';
import Filters from "../filters/Filters";
import useSettings from "../../hooks/useSettings";

function TeamMembersList(props) {
    const [filters, setFilters] = useState(null);
    const filterPanel = useRef();
    const supportGroupsApplications = useRef({});
    const fetcher = useContext(FetcherContext);
    const navigate = useNavigate();
    const settings = useSettings({
        key: 'manage-team-page-settings',
        initialValue: {filters: []},
        storageType: 'session'
    });

    // const pageSettings = useNewBrowserStorage({
    //     key: 'manage-team-page-settings',
    //     initialValue: {filters: []},
    //     storageType: 'session'
    // });

    const search = useSearch([], settings.get('search'));

    useEffect(() => {
        fetchTeamMembers();
        getOptions();
    }, []);

    const fetchTeamMembers = async (filters = []) => {
        const fields = {
            status: 'status',
            role: 'profile.role',
            accountable: 'accountable',
            access: 'access',
            application: 'settings.cti tool.applicationPermissions'
        };

        const query = filters.reduce((query, filter) => {
            query[fields[filter.name]] = {$in: filter.value};
            return query;
        }, {});

        const res = await fetcher.getUsers({
            query: {
                ...props.query,
                ...query,
                $or: [
                    {'accountable._id': props.user._id},
                    {highAccountable: props.user._id}
                ] 
            }
        });

        search.setData(res.ok? res.data : null);
    }

    const getOptions = async () => {
        const res = await fetcher.getUserFilters({
            query:{
                $or: [
                    {'accountable._id': props.user._id},
                    {highAccountable: props.user._id}
                ] 
            },
            settings: {
                filters: [
                    {name: 'status', field: 'status'},
                    {name: 'role', field: 'profile.role'},
                    {name: 'accountable', field: 'accountable'},
                    {name: 'application', field: 'settings.cti tool.applicationPermissions'},
                    {name: 'access', field: 'accesses'}
                ]
            }
        });

        if(!res.ok || !res.data.length) {
            setFilters([]);
            return;
        }
        const filterOptions = [];
        const storedFilters = settings.get('filters') || [];
        const initialValues = storedFilters.reduce((filters, filter) => {
            filters[filter.name] = filter.value;
            return filters;
        }, {});

        ['status', 'role', 'access'].forEach(filter => {
            filterOptions.push({
                name: filter,
                label: capitalize(filter),
                options: res.data[filter].map(value => ({
                    value,
                    label: capitalize(value)
                })),
                initialValue: initialValues[filter]
            });
        });

        filterOptions.push({
            name: 'accountable',
            label: 'Accountable',
            options: res.data.accountable.map(accountable => ({
                value: accountable._id,
                label: `${accountable.name} (${accountable.cargillId})`
            })),
            initialValue: initialValues.accountable
        });

        filterOptions.push({
            name: 'application',
            label: 'Application',
            options: res.data.application.map(application => ({
                value: application._id,
                label: application.name
            })),
            initialValue: initialValues.application
        });

        const supportGroups = res.data.application.reduce((options, application) => {
            if(options[application.supportGroup]) {
                options[application.supportGroup].push(application._id);
            } else {
                options[application.supportGroup] = [application._id];
            }
    
            return options;
        }, {});

        const supportGroupOptions = Object.keys(supportGroups).map(supportGroup => {
            supportGroupsApplications.current[supportGroup] = supportGroups[supportGroup];

            return {
                value: supportGroup,
                label: supportGroup
            };
        });

        filterOptions.push({
            name: 'support group',
            label: 'Support Group',
            options: supportGroupOptions,
            initialValue: initialValues['support group']
        });

        setFilters(filterOptions);
    }   

    const handleOnChangeFilters = (filters) => {
        settings.update({
            search: search.keyword,
            filters
        });

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

        fetchTeamMembers(filters);
    }

    const handleOnClickMember = (id) => {
        navigate(`${id}/account/accesses`);
    }

    const refresh = async () => {
        fetchTeamMembers();
        getOptions();
    }

    const openFilterPanel = () => {
        filterPanel.current.toggle();
    }

    const members = search.result().map(member => 
        <TeamMember 
            key={member._id} 
            member={member} 
            onClick={() => handleOnClickMember(member._id)}
        />
    );

    return (
        <div className={style.TeamMembersList}>
            {props.header &&
                <Header text={props.header} {...props.headerProps}>
                    <Button 
                        icon='refresh'
                        onClick={refresh}
                        tooltip='Refresh data'
                    />
                    {props.backButton &&
                        <Button
                            icon='back'
                            onClick={() => navigate('..', {relative: 'path'})}
                            tooltip='Back'
                        />
                    }
                </Header>
            }
            <div className={style.inputsContainer}>
                <Search 
                    className={style.filter} 
                    input={search} 
                    disabled={fetcher.awaitingResponse} 
                />
                <Button
                    icon='filter'
                    iconWeight={400}
                    onClick={filters? openFilterPanel : null}
                >
                    Filters
                </Button>
            </div>
            <List className={style.list} name='team-members' saveScrollPosition>
                {members}
            </List>
            {filters && 
                <Filters ref={filterPanel} filters={filters} onChange={handleOnChangeFilters}/>
            }
        </div>
    );
}

TeamMembersList.defaultProps = {
    query: {},
    headerProps: {}
}

export default TeamMembersList;