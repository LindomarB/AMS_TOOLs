import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import modules from '../../../../../data/app/modules';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import LoadableContent from '../../../../Interface/containers/loadableContent/LoadableContent';
import Page from '../../../../Interface/page/Page';
import MemberMenu from './memberMenu/MemberMenu';
import Profile from './profile/Profile';
import Status from './status/Status';
import Requests from './requests/Requests';
import Applications from '../../../settings/routes/ctiTool/applications/Applications';
import SupportGroups from '../../../settings/routes/ctiTool/supportGroups/SupportGroups';
import RemoveMember from './removeMember/RemoveMember';
import Accountables from '../../../settings/routes/account/accountables/Accountables';
import YourTeam from '../../home/yourTeam/YourTeam';
import MemberTeam from './memberTeam/MemberTeam';
import Tools from '../../../settings/routes/account/tools/Tools';
import style from './MemberDetails.module.css';
import NoDataFound from '../../../../Interface/noDataFound/NoDataFound';
import ResetPassword from './resetPassword/ResetPassword';

function MemberDetails(props) {
    const [member, setMember] = useState(null);
    const fetcher = useContext(FetcherContext);
    const params = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const from = useRef(searchParams.get('from'));
    
    useEffect(() => {
        getMember();
    }, []);

    const getMember = async () => {
        const res = await fetcher.getTeamMember(
            {query: {_id: params.id}},
            {awaitingFlag: 'refreshUser'}
        );

        if(!res.ok) {
            navigate(modules('team manager', 'manage team').path);
        }

        setMember(res.data);
    }

    const defaultRoute = (
        <Route 
            index
            path='*'
            element={<NoDataFound icon='list'>Use the side menu to navigate between sections</NoDataFound>}
        />
    );

    return (
        <LoadableContent loading={fetcher.awaiting.refreshUser}>
            {member &&
                <Page 
                    doubleContainer 
                    rightContainer={{
                        id: 'setting-container',
                        className: style.settingContainer
                    }}
                >
                    <MemberMenu member={member} backTo={from.current}/>
                    <>
                        <Routes>
                            <Route path='account'>
                                <Route 
                                    path='tools' 
                                    element={<Tools accountableView user={member} refreshUser={getMember}/>}
                                />
                                <Route 
                                    path='accountables' 
                                    element={<Accountables accountableView user={member} refreshUser={getMember}/>}
                                />
                                <Route 
                                    path='profile'
                                    element={<Profile member={member}/>}
                                />
                                {member.settings['password reset'] &&
                                    <Route 
                                        path='reset-password'
                                        element={<ResetPassword member={member} refreshUser={getMember}/>}
                                    />
                                }
                                {/* <Route 
                                    path='status' 
                                    element={<Status member={member} onChangeUserStatus={getMember}/>}
                                /> */}
                                {defaultRoute}
                            </Route>
                            {member && member.accesses.includes('cti tool') && 
                                <Route path='cti-tool'>
                                    
                                    <Route 
                                        path='applications' 
                                        element={<Applications accountableView user={member} refreshUser={getMember}/>}
                                    />
                                    <Route 
                                        path='support-groups' 
                                        element={<SupportGroups accountableView user={member} refreshUser={getMember}/>}
                                    />
                                    {defaultRoute}
                                </Route>
                            }
                            {member && member.accesses.includes('team manager') && 
                                <Route path='team'>
                                    <Route 
                                        path='members' 
                                        element={<MemberTeam member={member}/>}
                                    />
                                    <Route 
                                        path='stats' 
                                        element={<YourTeam className={style.stats} header='Team Stats' user={member} refreshUser={getMember}/>}
                                    />
                                    {defaultRoute}
                                </Route>
                            }
                            <Route 
                                path='requests' 
                                element={<Requests member={member} />}
                            />
                            <Route 
                                path='remove-member' 
                                element={<RemoveMember member={member} />}
                            />
                            {defaultRoute}
                        </Routes>
                    </>
                </Page>
            }
        </LoadableContent>
    );
}

export default MemberDetails;