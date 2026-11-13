import React, { useContext } from 'react';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import SelectUser from '../../../../../Interface/modal/appModals/selectUser/SelectUser';
import UserContext from '../../../../../context/userContext/UserContext';
import ModalContext from '../../../../../context/modalContext/ModalContext';
import DirectMemberChanging from './directMemberChanging/DirectMemberChanging';
import capitalize from '../../../../../../functions/text/capitalize';
import sortByField from '../../../../../../functions/array/sortByField';

function AddMember(props) {
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);
    const modalCtx = useContext(ModalContext);

    const handleOnAdd = async (newMember, checkConflicts = true) => {
        const memberConflicts = checkConflicts && await hasMemberConflicts(newMember);

        if(memberConflicts) return;

        const res = await fetcher.addMember({
            userId: newMember._id
        });

        props.refreshData();

        if(res.ok) {
            userCtx.refresh();
            props.onClose();
        }

        return res;
    }

    const hasMemberConflicts = async (newMember) => {
        const newMemberTeam = await fetcher.getUsers({
            query: {'accountables._id': newMember._id},
            settings: {getCtiApplications: true}
        });

        if(!newMemberTeam.ok) return true;

        const conflictingMembers = newMemberTeam.data.filter(member => 
            member.accountables.some(accountable => accountable._id === userCtx.user._id && accountable.primary)
        );

        if(conflictingMembers.length) {
            for(let member of conflictingMembers) {
                const accountables = member.accountables.reduce((accountables, accountable) => {
                    if(accountable._id !== userCtx.user._id && accountable.primary) {
                        accountables.push(accountable._id);
                    }

                    return accountables;
                }, []);

                const res = await fetcher.getUsers({
                    query: {
                        _id: {$in: accountables}
                    },
                    settings: {
                        projection: {
                            accesses: 1,
                            'settings.cti tool.applications': 1
                        }
                    }
                });

                if(!res.ok) return true;

                const directlyAccountableAccesses = res.data.reduce((accesses, accountable) => {
                    accesses.push(...accountable.accesses);
                    return accesses;
                }, []);

                const directlyAccountableApplications = res.data.reduce((applications, accountable) => {
                    applications.push(...accountable.settings['cti tool']? accountable.settings['cti tool'].applications : []);
                    return applications;
                }, []);

                member.conflicts = {
                    'Tools': member.accesses.filter(access => !directlyAccountableAccesses.includes(access))
                        .map(access => ({label: capitalize(access), value: access})),
                    'CTI Tool - Applications': member.settings['cti tool']
                        ? member.settings['cti tool'].applications.filter(application => !directlyAccountableApplications.includes(application._id))
                        .map(application => ({label: application.name, value: application._id}))
                        : []
                };

                for(let type in member.conflicts) {
                    if(!member.conflicts[type].length) {
                        delete member.conflicts[type];
                    } else {
                        member.conflicts[type] = sortByField(member.conflicts[type], 'label');
                    }
                }
            }

            modalCtx.close();
            modalCtx.show(
                <DirectMemberChanging 
                    newMember={newMember}
                    conflictingMembers={conflictingMembers}
                    onConfirm={handleOnAdd}
                />
            );

            return true;
        } else {
            return false;
        }
    }
    
    return (
        <SelectUser
            useServerData={{
                fetcher: {
                    method: 'getNewMemberOptions'
                }
            }}
            modal={{
                title: 'Add member',
                titleIcon: {
                    name: 'add user',
                    filled: true
                },
                subtitle: `Add new members to your team.`,
                onClose: props.onClose
            }}
            input={{
                label: 'Select a new member',
                placeholder: 'Search member name (name, e-mail or ID)'
            }}
            button={{
                text: 'Add member',
                icon: 'add user',
                awaiting: fetcher.awaiting.addMember || fetcher.awaiting.getUsers
            }}
            onConfirm={handleOnAdd}
        />
     );
}

AddMember.defaultProps = {
    disableBackdropClose: true
};

export default AddMember;