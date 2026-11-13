import React from 'react';
import Member from './Member/Member';
import Card from '../../../../Interface/card/Card';
import style from './OrganizationalChart.module.css';
import LoadableContent from '../../../../Interface/containers/loadableContent/LoadableContent';
import NavigationLegend from './navigationLegend/NavigationLegend';
import Legend from './legend/Legend';

function OrganizationalChart(props) {
    const checkConnectors = (originRole, memberRole) => {
        const roleLevel = {
            administrator: 0,
            manager: 1,
            'track leader': 2,
            analyst: 3
        };

        const originLevel = roleLevel[originRole];
        const memberLevel = roleLevel[memberRole];
        const connectors = [];
        let connectorsAmount = (memberLevel - originLevel) - 1;

        while(connectorsAmount > 0) {
            connectors.push((
                <div key={connectorsAmount} className={`${memberRole === 'analyst'? style.analystConnector : ''}`}>
                    <div className={style.connector}></div>
                </div>
            ));

            connectorsAmount--;
        }

        return connectors;
    }

    const mountTeam = (origins, multipleAccountables) => {
        origins = origins.filter(origin => origin);

        if(!origins.length) return null; 

        const origin = origins[0];

        if(!origin._team || !origin._team.length) {
            return (
                <div key={`bottom-${origin._id}`} className={`${style.members}`}>
                    {origins.map(origin => (
                        <Member 
                            className={style.member}
                            key={origin._id}
                            user={origin} 
                            onClick={props.onClickMember}
                            shortTopConnector={multipleAccountables}
                        />
                    ))}
                </div>
            );
        }

        let directMembers = origin._team.filter(member => member.accountables.find(accountable => accountable._id === origin._id).primary);
        const analysts = directMembers.filter(member => member.profile.role === 'analyst');
        directMembers = directMembers.filter(member => member.profile.role !== 'analyst');
        
        let teams = directMembers.map(member => {
            return {
                accountables: [member],
                members: member._team
            };
        });

        for(let i = 0; i < teams.length; i++) {
            const team = teams[i];
            if(!team || !team.members) continue;

            for(let j = i + 1; j < teams.length; j++) {
                const nextTeam = teams[j];
                if(!nextTeam || !team.members) continue;

                const areTeamsSame = 
                    team.accountables[0].profile.role === nextTeam.accountables[0].profile.role &&
                    team.members.length === nextTeam.members.length && 
                    team.members.every(member => nextTeam.members.some(nextTeamMember => nextTeamMember._id === member._id));
                
                if(areTeamsSame) {
                    team.accountables.push(...nextTeam.accountables);
                    teams[j] = null;
                }
            }
        }

        teams = teams.filter(team => team);

        const originTeamMembers = teams.map(team => {
            const teamEl = mountTeam(team.accountables, origins.length > 1);
            const connectors = checkConnectors(origin.profile.role, team.accountables[0].profile.role);

            if(connectors.length) {
                return (
                    <div key={`connectors-${team.accountables[0]._id}`} className={`${style.connectorsContainer}`}>
                        {connectors}
                        {teamEl}
                    </div>
                );
            } else {
                return teamEl;
            }
        });

        if(analysts.length) {
            const analystTeam = (
                <div key='analyst-team' className={`${style.analystTeam}`}>
                        {analysts.map(member => (
                            <Member 
                                key={member._id}
                                user={member} 
                                onClick={props.onClickMember}
                            />
                        ))}
                </div>
            );

            const connectors = checkConnectors(origin.profile.role, 'analyst');

            if(originTeamMembers.length) {
                if(connectors.length) {
                    originTeamMembers.push((
                        <div key='analyst-team' className={`${style.analystCorner} ${style.connectorsContainer}`}>
                            {connectors}
                            {analystTeam}
                        </div>
                    ));
                } else {
                    originTeamMembers.push(analystTeam);
                }
            } else {
                if(connectors.length) {
                    originTeamMembers.push((
                        <div key='analyst-team' className={`${style.connectorsContainer}`}>
                            {connectors}
                            {analystTeam}
                        </div>
                    ));
                } else {
                    originTeamMembers.push(analystTeam);
                }
            }
        }
   
        const analystTeamConnector = origins.length === 1 && origin._team.every(member => member.profile.role === 'analyst');
        const accountablesMembersConnector = origins.length > 1 && (teams.length > 1 || (teams.length === 1 && teams[0].accountables.length > 1));

        return (
            <div key={`team-${origins[0]._id}`} className={`${style.team} ${origins.length > 1? style.multipleAccountables : ''}`}>
                <div className={`${origin.accountables && origin.accountables.length? style.topConnections : ''} ${style.accountablesNew}`}>
                    {origins.map(origin => (
                        <Member 
                            key={origin._id}
                            user={origin} 
                            analystTeamConnector={analystTeamConnector}
                            onClick={props.onClickMember}
                            shortTopConnector={multipleAccountables}
                            shortBottomConnector={origins.length > 1}
                        />
                    ))}
                </div>
                {accountablesMembersConnector && 
                    <div className={style.accountablesMembersConnector}></div>
                }
                <div className={`${style.members}`}>
                    {originTeamMembers}
                </div>
            </div>
        );
    }

    const mountAccountables = (origin, members) => {
        if(!origin || !origin.accountables || !origin.accountables.length) return null;
        
        const teams = origin.accountables.filter(accountable => accountable.primary).map(primaryAccountable => {
            const accountable = members.find(member => member._id === primaryAccountable._id);
            accountable._badge = 'directly accountable';

            if(accountable.accountables && accountable.accountables.length) {
                return {
                    accountables: accountable.accountables.map(accountable => members.find(member => member._id === accountable._id)),
                    members: [accountable]
                };
            } else {
                return {
                    accountables: [accountable],
                    members: null
                };
            }
        });

        for(let i = 0; i < teams.length; i++) {
            const team = teams[i];
            if(!team || !team.members) continue;

            for(let j = i + 1; j < teams.length; j++) {
                const nextTeam = teams[j];
                if(!nextTeam || !team.members) continue;

                const hasSameAccountables = 
                    team.accountables.length === nextTeam.accountables.length && 
                    team.accountables.every(accountable => nextTeam.accountables.some(nextTeamAccountable => nextTeamAccountable._id === accountable._id));

                if(hasSameAccountables) {
                    team.members.push(...nextTeam.members);
                    teams[j] = null;
                }
            }
        }

        const removeOneLevel = teams.every(team => !team.members);

        const el = teams.filter(team => team).map((team, idx) => {
            const accountables = team.accountables.map(accountable => (
                <Member 
                    key={accountable._id}
                    user={accountable} 
                    info={['profile']}
                    onClick={props.onClickMember}
                />
            ));

            const members = team.members
                ? team.members.map(member => (
                    <Member 
                        key={member._id}
                        user={member} 
                        info={['profile']}
                        onClick={props.onClickMember}
                    />
                ))
                : <div className={style.connector}></div>;

            return (
                <div key={idx} className={style.team}>
                    <div className={`${style.accountablesNew}`}>
                        {accountables}
                    </div>
                    {!removeOneLevel &&
                        <div className={style.members}>
                            {members}
                        </div>
                    }
                </div>
            );
        });

        return el;
    }

    const members = structuredClone(props.members);

    members.forEach(member => {
        if(member.profile.role === 'analyst') return;

        member._team = members.filter(
            user => user.accountables.some(
                accountable => accountable._id === member._id && accountable.primary
        ));
    });

    const origin = members.find(member => member._id === props.origin);

    if(origin) {
        origin._badge = 'you';
        origin._team.forEach(member => {
            member._badge = 'directly member'
        });
    }

    const accountables = mountAccountables(origin, members);
    const teamNew = mountTeam([origin]);

    return (
        <div className={`${style.OrganizationalChart} ${props.className || ''}`}>
            <Card className={`${style.card} ${props.cardClassName || ''}`} pan zoom legend>
                <LoadableContent loading={props.loading}>
                    <div className={style.mainContainer}>
                        <div className={`${style.teamContainer}`}>
                            <div className={`${style.topContainer} ${style.accountables}`}>
                                {accountables}
                            </div>
                            <div className={style.bottomContainer}>
                                {teamNew}
                            </div>
                        </div>
                    </div>
                </LoadableContent>
            </Card>
            <div className={style.legends}>
                <Legend />
                <NavigationLegend />
            </div>
        </div>
    );
}

OrganizationalChart.defaultProps = {
    members: []
}

export default OrganizationalChart;