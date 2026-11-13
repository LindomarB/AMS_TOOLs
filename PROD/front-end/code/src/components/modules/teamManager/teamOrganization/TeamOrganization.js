import React, { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../../../context/userContext/UserContext';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import OrganizationalChart from './organizationalChart/OrganizationalChart';
import Page from '../../../Interface/page/Page';
import Header from '../../../Interface/header/Header';
import TextInput from '../../../Interface/inputs/textInput/TextInput';
import useInput from '../../../hooks/useInput';
import wordsSplitter from '../../../../functions/text/wordsSplitter';
import Filters from '../../../Interface/filters/Filters';
import IconNavbar from '../../../Interface/navigation/IconNavbar/IconNavbar';
import useSettings from '../../../hooks/useSettings';
import style from './TeamOrganization.module.css';
import Help from '../../../Interface/help/Help';
import teamHelp from '../data/help/teamHelp';
import InfoDrawer from '../../../Interface/drawer/infoDrawer/InfoDrawer';
import UserResume from '../../../Interface/user/userResume/UserResume';
import Button from '../../../Interface/buttons/button/Button';
import { useNavigate } from 'react-router-dom';
import modules from '../../../../data/app/modules';

function TeamOrganization(props) {
    const settings = useSettings({
        key: 'team-organization-page-settings',
        storageType: 'session'
    });
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState([]);
    const [currentFilters, setCurrentFilters] = useState(settings.get('currentFilters') || []);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [memberResume, setMemberResume] = useState(null);
    const user = useContext(UserContext).user;
    const fetcher = useContext(FetcherContext);
    const supportGroupsApplications = useRef({});
    const filtersEl = useRef();
    const navigate = useNavigate();

    const search = useInput({
        name: 'search',
        initialValue: settings.get('search') || ''
    });

    useEffect(() => {
        getMembers();
        getFilters();
    }, []);

    useEffect(() => {
        settings.update({
            ...settings.get(),
            currentFilters,
            search: search.value
        });
    }, [currentFilters, search.value]);

    useEffect(() => {
        setMembers(curSt => {
            const newState = curSt.map(member => {
                member._highlight = false;
                return member;
            });

            const words = wordsSplitter(search.value);

            newState.forEach(member => {
                for(let word of words) {
                    member._highlight = 
                        member.profile.name.toLowerCase().includes(word.toLowerCase()) ||
                        member.profile.cargillId.toLowerCase().includes(word.toLowerCase()) ||
                        member.profile.email.toLowerCase().includes(word.toLowerCase());
                    if(member._highlight) break;
                }
            });

            let accesses = currentFilters.find(filter => filter.name === 'accesses');
            accesses = accesses? accesses.value : []

            newState.forEach(member => {
                if(!member._highlight) {
                    member._highlight = member.accesses.some(memberAccess => accesses.includes(memberAccess));
                }
            });

            const supportGroups = currentFilters.find(filter => filter.name === 'settings.cti tool.applications.support group');
            let applications = currentFilters.find(filter => filter.name === 'settings.cti tool.applications');
            applications = [
                ...applications? applications.value : [],
                ...supportGroups? supportGroups.value.join(',').split(',') : []
            ];

            newState.forEach(member => {
                if(!member._highlight) {
                    member._highlight = member.settings['cti tool'] && member.settings['cti tool'].applications.some(
                        memberApplication => applications.includes(typeof memberApplication === 'string'? memberApplication : memberApplication._id)
                    );
                }
            });

            return newState;
        });
        
    }, [search.value, currentFilters]);

    useEffect(() => {
        setMembers(curSt => curSt.map(member => {
            member._selected = memberResume && memberResume.user._id === member._id;
            return member;
        }));
    }, [memberResume]);

    const getMembers = async () => {
        const res = await fetcher.getOrgChart();

        if(res.ok) {
            setMembers(res.data);
        }
    }

    const getFilters = async () => {
        const res = await fetcher.getUserFilters({
            query: {
                $or: [
                    {'accountables._id': user._id},
                    {_id: {$in: [user._id, ...user.accountables.map(accountable => accountable._id)]}}
                ]
            },
            settings: {
                projection: {
                    'Access': 1,
                    'CTI Tool - Application': 1
                }
            }
        });

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

    const handleOpenFilters = () => {
        setOpenFilters(curSt => !curSt);
    }

    const handleOnClearAllFilters = () => {
        filtersEl.current.clearFilters();
        search.reset();
    }

    const refresh = async () => {
        getFilters();
        getMembers();
    }

    const handleOnClickMember = (member, info) => {
        if(memberResume && memberResume.user._id === member._id) {
            setMemberResume(null);
        } else {
            setMemberResume({
                user: member,
                info
            });
        }
    }

    const onCloseMemberResume = () => {
        setMemberResume(null);
    }

    const handleOnClickManageMember = () => {
        navigate(`${modules('team manager', 'manage team').path}/${memberResume.user._id}/account/accountables?from=${modules('team manager', 'team organization').path}`);
    }

    const disabled = fetcher.awaiting.getOrgChart || fetcher.awaiting.getUserFilters;
    
    const buttonProps = {
        type: 'icon',
        disabled
    };

    const buttons = [
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
        {
            ...buttonProps,
            icon: 'refresh',
            tooltip: 'Refresh',
            onClick: refresh, 
        },
        {rule: true},
        <Help content={Object.values(teamHelp)}/>
    ];

    return (
        <Page className={style.TeamOrganization}>
            <Header 
                className={style.header}
                childrenContainerClassName={style.headerChildren}
                text='Team Organization' 
                iconProps={{
                    name: 'team organization',
                    filled: true
                }}
                color='theme'
                rule
            >
                <TextInput 
                    className={style.search}
                    input={search}
                    icon='search'
                    placeholder='Search for a member (name, e-mail or ID)'
                    cleanButton
                    debouncing
                />
                <IconNavbar className={style.iconNavbar} buttons={buttons}/>
            </Header>
            <OrganizationalChart 
                className={style.chart}
                cardClassName={style.chartCard}
                members={members} 
                origin={user._id} 
                loading={fetcher.awaiting.getOrgChart || fetcher.awaiting.getUserFilters}
                onClickMember={handleOnClickMember}
            />
            {filters &&
                <Filters
                    ref={filtersEl} 
                    filters={filters} 
                    open={openFilters} 
                    setOpen={setOpenFilters} 
                    onChange={handleOnChangeFilters}
                    disabled={fetcher.awaiting.getUserFilters}
                />
            }
            <InfoDrawer 
                header={{
                    text: 'Member Details',
                    children: memberResume && memberResume.user.accountables.some(accountable => accountable._id === user._id)
                        ? (
                            <Button 
                                type='icon'
                                color='grey'
                                icon='manage_accounts'
                                iconWeight={300}
                                tooltip='Manage member'
                                onClick={handleOnClickManageMember}
                            />
                        )
                        : null
                }}
                elementKey={memberResume && memberResume.user._id}
                onClose={onCloseMemberResume}
            >
                {memberResume &&
                    <UserResume 
                        className={style.userResume}
                        user={memberResume.user} 
                        info={memberResume.info}
                        notShow={{
                            profile: ['user photo', 'created on']
                        }}
                    />
                }
            </InfoDrawer>
        </Page>
    );
}

export default TeamOrganization;