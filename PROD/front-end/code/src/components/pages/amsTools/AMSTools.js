import React, { Fragment, Suspense, useContext, useState, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext/UserContext';
import AppSideNavbar from './AppSideNavbar/AppSideNavbar';
import AppTopNavbar from './AppTopNavbar/AppTopNavbar';
import modules from '../../../data/app/modules';
import FadeTransition from '../../Interface/animations/fadeTransition/FadeTransition';
import Notifications from '../../modules/notifications/Notifications';
import style from './AMSTools.module.css';
import Loading from '../../Interface/loaders/loading/Loading';
import TeamOrganization from '../../modules/teamManager/teamOrganization/TeamOrganization';
import About from '../../modules/about/About';
import PageNotFound from '../pageNotFound/PageNotFound';
import Redirect from '../redirect/Redirect';
import Support from '../../modules/support/Support';
import FAQ from '../../modules/support/faq/FAQ';
import TalkToUs from '../../modules/support/talkToUs/TalkToUs';
import ReportBug from '../../modules/support/reportBug/ReportBug';

const Home = lazy(() => import('../../modules/home/Home'));
const CTITool = lazy(() => import('../../modules/ctiTool/CTITool'));
const TeamManager = lazy(() => import('../../modules/teamManager/TeamManager'));
const SLATime = lazy(() => import('../../modules/slaTime/SLATime'));
const Settings = lazy(() => import('../../modules/settings/Settings'));
// const AccountRequests = lazy(() => import('../../modules/teamManager/accountRequests/AccountRequests'));
const TeamRequests = lazy(() => import('../../modules/teamManager/teamRequests/TeamRequests'));
const ManageTeam = lazy(() => import('../../modules/teamManager/manageTeam/ManageTeam'));
const MemberDetails = lazy(() => import('../../modules/teamManager/manageTeam/memberDetails/MemberDetails'));
const CreateResolution = lazy(() => import('../../modules/ctiTool/createResolution/CreateResolution'));
const Search = lazy(() => import('../../modules/ctiTool/search/Search'));
const EditResolution = lazy(() => import('../../modules/ctiTool/editResolution/EditResolution'));
const ApplicationCatalog = lazy(() => import('../../modules/applicationCatalog/ApplicationCatalog'));
const Overview = lazy(() => import('../../modules/ctiTool/dashboards/overview/Overview'));
const TiersExport = lazy(() => import('../../modules/ctiTool/tiersTreeManagement/tiersExport/TiersExport'));
const TiersTreeManagement = lazy(() => import('../../modules/ctiTool/tiersTreeManagement/TiersTreeManagement'));

function AMSTools() {
    const [showNotifications, setShowNotifications] = useState(false);
    const userCtx = useContext(UserContext);
    const location = useLocation();

    const user = userCtx.user;
    const rootPath = `/${location.pathname.split('/')[1]}`;

    if(!modules(location.pathname)) {
        return <PageNotFound />;
    }

    return (
        <div className={style.AMSTools} >
            <AppSideNavbar />
            <AppTopNavbar setShowNotifications={setShowNotifications} showingNotifications={showNotifications}/>
            <Notifications open={showNotifications} setOpen={setShowNotifications}/>
            <FadeTransition currentElementKey={rootPath} timeout={300}>
                <Suspense fallback={<Loading />}>
                        <Routes location={location}>
                                <Route path={modules('home').path} element={<Home />} />
                                {user.accesses.includes('cti tool') &&
                                    <Fragment>
                                        <Route path={modules('cti tool').path} element={<CTITool />}/>
                                        <Route path={`${modules('cti tool', 'create resolution').path}/*`} element={<CreateResolution />} />
                                        <Route path={`${modules('cti tool', 'search').path}`} element={<Search />} />
                                        <Route path={`${modules('cti tool', 'search').path}/:id`} element={<Search />} />
                                        <Route path={`${modules('cti tool').getRoute('edit resolution').path}/:resolution`} element={<EditResolution />} />
                                        <Route path={modules('cti tool', 'dashboards').path} element={<Overview />} />
                                        <Route path={modules('cti tool', 'tiers tree management').path} element={<TiersTreeManagement />} />
                                        <Route path={modules('cti tool', 'tiers tree management').getRoute('export tiers').path} element={<TiersExport />} />
                                    </Fragment>
                                }
                                {user.accesses.includes('team manager') &&
                                    <Fragment>
                                        <Route path={modules('team manager').path} element={<TeamManager />} />
                                        <Route path={`${modules('team manager', 'manage team').path}`} element={<ManageTeam />}/> 
                                        <Route path={`${modules('team manager', 'manage team').getRoute('member details').path}/*`} element={<MemberDetails />}/> 
                                        <Route path={modules('team manager', 'team organization').path} element={<TeamOrganization />} />
                                        <Route path={modules('team manager', 'team requests').path} element={<TeamRequests />} />
                                        {/* <Route path={modules('team manager', 'account requests').path} element={<AccountRequests />} /> */}
                                    </Fragment>
                                }
                                <Route path={modules('application catalog').path} element={<ApplicationCatalog />} />
                                <Route path={modules('sla time').path} element={<SLATime />} />
                                <Route path={`${modules('account settings').path}/*`} element={<Settings />} />
                                <Route path={`${modules('support').path}/`} element={<Support />} />
                                <Route path={`${modules('support', 'faq').path}/`} element={<FAQ />} />
                                <Route path={`${modules('support', 'talk to us').path}/`} element={<TalkToUs />} />
                                <Route path={`${modules('support', 'report bug').path}/`} element={<ReportBug />} />
                                <Route path={`${modules('support', 'release notes').path}/*`} element={<About />} />
                                <Route path='/*' element={<Redirect />}/>
                        </Routes>
                </Suspense>
            </FadeTransition>
        </div>
    );
}

export default AMSTools;
