import React, { useState } from 'react';
import Text from '../../../Interface/Text/Text';
import Card from '../../../Interface/card/Card';
import Icon from '../../../Interface/icons/icon/Icon';
import style from './ComponentsLibrary.module.css';
import SideNavbar from '../../../Interface/navigation/sideNavbar/SideNavbar';
import Tabs from '../../../Interface/navigation/tabs/Tabs';
import IconNavbar from '../../../Interface/navigation/IconNavbar/IconNavbar';
import Button from '../../../Interface/buttons/button/Button';
import TopNavbar from '../../../Interface/navigation/topNavbar/TopNavbar';
import Header from '../../../Interface/header/Header';
import BadgeIcon from '../../../Interface/icons/badgeIcon/BadgeIcon';
import UserPhoto from '../../../Interface/user/userPhoto/UserPhoto';
import randomColor from '../../../../functions/randomColor';
import List from '../../../Interface/list/List';
import Notification from '../../notifications/notification/Notification';
import UserRequest from '../../../Interface/requestList/userRequest/UserRequest';
import Resolution from '../../../Interface/listItems/resolution/Resolution';
import LIQuickAccess from '../../../Interface/listItems/liQuickAccess/LIQuickAccess';
import CardButton from '../../../Interface/buttons/cardButton/CardButton';
import Banner from '../../../Interface/banner/Banner';
import TextInput from '../../../Interface/inputs/textInput/TextInput';
import useInput from '../../../hooks/useInput';
import Select from '../../../Interface/inputs/select/Select';
import useSearch from '../../../hooks/useSearch';
import Search from '../../../Interface/inputs/search/Search';
import DateTimeInput from '../../../Interface/inputs/dateTimeInput/DateTimeInput';
import DateTimeRangeInput from '../../../Interface/inputs/dateTimeRangeInput/DateTimeRangeInput';
import WeekInput from '../../../Interface/inputs/weekInput/WeekInput';
import MonthInput from '../../../Interface/inputs/monthInput/MonthInput';
import appModules from '../../../../data/app/modules';
import modules from '../../../../data/app/modules';
import Access from '../../settings/routes/account/accesses/allowedAccesses/access/Access';
import AccessRequest from '../../settings/routes/account/accesses/pendingRequests/accessRequest/AccessRequest';


function ComponentsLibrary(props) {
    const items = [];

    items.push({
        module: 'home',
        group: 1
    });

    items.push({
        module: 'cti tool',
        group: 1
    });

    items.push({
        module: 'sla time',
        group: 1
    });

    items.push({
        module: 'notification center',
        group: 2
    });

    items.push({
        module: 'team manager',
        group: 2
    });

    items.push({
        module: 'settings',
        group: 2,
        disableSubmenu: true
    });

    const [tab, setTab] = useState(0);
    const textInput = useInput({
        name: 'textInput'
    });
    const numberInput = useInput({
        name: 'numberInput'
    });
    const invalidTextInput = useInput({
        name: 'invalidTextInput',
        initialValue: 'This value is invalid',
        errorChecker: () => 'This is an error message'
    });
    const selectInput = useInput({
        name: 'selectInput'
    });
    const invalidSelectInput = useInput({
        name: 'invalidSelectInput',
        initialValue: 'This value is invalid',
        errorChecker: () => 'This is an error message'
    });

    const selectStringOptions = ['Option A', 'Option B', 'Option C'];
    const selectObjectOptions = [{label: 'Option A', value: 'a'}, {label: 'Option B', value: 'b'}, {label: 'Option C', value: 'c'}];

    const searchInput = useSearch();

    const dateInput = useInput({
        name: 'dateInput'
    });

    const timeInput = useInput({
        name: 'timeInput'
    });

    const dateTimeInput = useInput({
        name: 'dateTimeInput'
    });

    const dateMaxInput = useInput({
        name: 'dateMaxInput'
    });

    const dateTimeMaxInput = useInput({
        name: 'dateTimeMaxInput'
    });

    const dateMinInput = useInput({
        name: 'dateMinInput'
    });

    const dateTimeMinInput = useInput({
        name: 'dateTimeMinInput'
    });

    const dateRangeInput = useInput({
        name: 'dateRangeInput'
    });

    const timeRangeInput = useInput({
        name: 'timeRangeInput'
    });

    const dateTimeRangeInput = useInput({
        name: 'dateTimeRangeInput'
    });

    const dateRangeMinInput = useInput({
        name: 'dateRangeMinInput'
    });

    const dateRangeMaxInput = useInput({
        name: 'dateRangeMaxInput'
    });

    const dateRangeMinMaxInput = useInput({
        name: 'dateRangeMaxInput'
    });

    const dateTimeRangeMinInput = useInput({
        name: 'dateTimeRangeMinInput'
    });

    const dateTimeRangeMaxInput = useInput({
        name: 'dateTimeRangeMaxInput'
    });

    const dateTimeRangeMinMaxInput = useInput({
        name: 'dateTimeRangeMaxInput'
    });

    const weekInput = useInput({
        name: 'weekInput'
    });

    const monthInput = useInput({
        name: 'monthInput'
    });

    const resolutions = [
        {
            supportGroup: "Support Group 1",
            application: "App_A",
            incident: "INC000123456789",
            priority: "high",
            country: "Argentina",
            classification: "Monitoring Event",
            tier1: "BOLTONS",
            tier2: "CTMS APBU",
            tier3: "LIQUIDACION",
            tier4: "PRE-LIQUIDACION",
            tier5: "SALES UPDATE EXECUTION",
            problem: "This is the problem description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
            diagnosisMatchProblem: "yes",
            isReopening: "yes",
            reopeningReason: "Resolved through User Not Available Process and User Reopened",
            solution: "This is the solution description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.  bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
            usedSql: "yes",
            sqlCode: "CREATE TABLE emp (\nempno INT PRIMARY KEY,\nename VARCHAR(10),\njob VARCHAR(9),\nmgr INT NULL,\nhiredate DATETIME,\nsal NUMERIC(7,2),\ncomm NUMERIC(7,2) NULL,\ndept INT)\nbegin\ninsert into emp values\n    (1,'JOHNSON','ADMIN',6,'12-17-1990',18000,NULL,4)\ninsert into emp values\n    (2,'HARDING','MANAGER',9,'02-02-1998',52000,300,3)\ninsert into emp values\n    (3,'TAFT','SALES I',2,'01-02-1996',25000,500,3)\ninsert into emp values\n    (4,'HOOVER','SALES I',2,'04-02-1990',27000,NULL,3)\ninsert into emp values\n    (5,'LINCOLN','TECH',6,'06-23-1994',22500,1400,4)\ninsert into emp values\n    (6,'GARFIELD','MANAGER',9,'05-01-1993',54000,NULL,4)\ninsert into emp values\n    (7,'POLK','TECH',6,'09-22-1997',25000,NULL,4)\ninsert into emp values\n    (8,'GRANT','ENGINEER',10,'03-30-1997',32000,NULL,2)\ninsert into emp values\n    (9,'JACKSON','CEO',NULL,'01-01-1990',75000,NULL,4)\ninsert into emp values\n    (10,'FILLMORE','MANAGER',9,'08-09-1994',56000,NULL,2)\ninsert into emp values\n    (11,'ADAMS','ENGINEER',10,'03-15-1996',34000,NULL,2)\ninsert into emp values\n    (12,'WASHINGTON','ADMIN',6,'04-16-1998',18000,NULL,4)\ninsert into emp values\n    (13,'MONROE','ENGINEER',10,'12-03-2000',30000,NULL,2)\ninsert into emp values\n    (14,'ROOSEVELT','CPA',9,'10-12-1995',35000,NULL,1)\nend\nCREATE TABLE dept (\ndeptno INT NOT NULL,\ndname VARCHAR(14),\nloc VARCHAR(13))\nbegin\ninsert into dept values (1,'ACCOUNTING','ST LOUIS')\ninsert into dept values (2,'RESEARCH','NEW YORK')\ninsert into dept values (3,'SALES','ATLANTA')\ninsert into dept values (4, 'OPERATIONS','SEATTLE')\nend",
            slaLost: "yes",
            breachWasWiproFault: "yes",
            breachReason: "Incident/Change Timing Misalignment",
            pbi: "PBI000123456789",
            kba: "kba000123456789",
            _id: 1
        },
        {
            supportGroup: "Support Group 2",
            application: "App_F",
            incident: "INC000123456788",
            priority: "medium",
            country: "Brasil",
            classification: "",
            tier1: "",
            tier2: "",
            tier3: "",
            tier4: "",
            tier5: "",
            problem: "This is the problem description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
            diagnosisMatchProblem: "no",
            isReopening: "no",
            solution: "This is the solution description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.  bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
            usedSql: "no",
            slaLost: "yes",
            breachWasWiproFault: "no",
            breachReason: "Interface Auto Resolved",
            pbi: "PBI000123456788",
            _id: 2
        },
        {
            supportGroup: "Support Group 1",
            application: "",
            incident: "INC000123456787",
            priority: "high",
            country: "Brasil",
            classification: "Out of Scope",
            tier1: "INTERFACE TIBCO/OPENTEXT",
            tier2: "",
            tier3: "",
            tier4: "",
            tier5: "",
            problem: "",
            diagnosisMatchProblem: "",
            isReopening: "",
            solution: "",
            usedSql: "",
            slaLost: "",
            _id: 3
        }
    ];

    const userRequestData = [
        {
            type: 'access',
            status: 'pending',
            meta: {createdOn: '01/02/2023'},
            data: {tool: 'CTI Tool'}
        },
        {
            type: 'role change',
            status: 'approved',
            meta: {createdOn: '01/02/2023'},
            data: {previousAccountable: {name: 'Previous Accountable'}, newAccountable: {name: 'New Accountable'}, previousRole: 'Analyst', newRole: 'Track Leader'}
        },
        {
            type: 'accountable change',
            status: 'refused',
            meta: {createdOn: '01/02/2023'},
            data: {previousAccountable: {name: 'Previous Accountable'}, newAccountable: {name: 'New Accountable'}}
        },
        {
            type: 'cti application',
            status: 'canceled',
            meta: {createdOn: '01/02/2023'},
            data: {application: 'JDE E1'}
        },
        {
            type: 'cti application',
            status: 'expired',
            meta: {createdOn: '01/02/2023'},
            data: {application: 'JDE E1'}
        },
    ];

    return (
        <div className={style.ComponentsLibrary}>
            <h3>{'<Text></Text>'}</h3>
            <Text size={18}>Title</Text>
            <Text size={20}>20px - Black</Text>
            <Text size={16}>16px - Black</Text>
            <Text grey size={14}>14px - Grey</Text>
            <Text grey size={12}>12px - Grey</Text>
            <h3>{'<Card></Card>'}</h3>
            <Card>
                <Text size={16}>16px - Black</Text>
                <Text grey size={14}>14px - Grey</Text>
            </Card>
            <Card shadow>
                <Text size={16}>16px - Black</Text>
                <Text grey size={14}>14px - Grey</Text>
            </Card>
            {/* <img src={'/images/icons/helix.svg'} /> */}
            <h3>{'<Icon></Icon>'}</h3>
            <div style={{display: 'flex', columnGap: '2rem', rowGap: '2rem', flexWrap: 'wrap'}}>
                <Icon name='team requests'/>
                <Icon name='team requests' color='theme'/>
                <Icon name='team requests' type='outlined' color='grey' size={12}/>
                <Icon name='team requests' type='outlined' color='grey' size={36}/>
            </div>
            <h3>{'<SideNavbar></SideNavbar>'}</h3>
            <div style={{height: '800px'}}>
                <SideNavbar items={items} />
            </div>
            <h3>{'<Tab></Tab>'}</h3>
            <Tabs tabs={['tab1 long tab', 'tab2', 'tab3']} track selectedTab={tab} onClick={(tab) => setTab(tab)}/>
            <Tabs tabs={['tab1 long tab', 'tab2', 'tab3']} vertical track selectedTab={tab} onClick={(tab) => setTab(tab)}/>
            <Tabs tabs={['tab1 long tab', 'tab2', 'tab3']} pill selectedTab={tab} onClick={(tab) => setTab(tab)}/>
            <h3>{'<IconNavbar></IconNavbar>'}</h3>
            <div style={{backgroundColor: '#06596B', padding: '1rem'}}>
                <IconNavbar buttons={[{icon: 'home', label: 'Home', path: '/components-library'}, {icon: 'cti tool', label: 'CTI Tool', path: '/cti-tool'}, {icon: 'settings', label: 'Settings', path: '/settings'}]}/>
            </div>
            <h3>{'<TopNavbar></TopNavbar>'}</h3>
            <div>
                <TopNavbar title='Team Manager' titleIcon='team manager' subtitle='Home' menuItems={[{icon: 'home', label: 'Home', path: '/components-library'}, {icon: 'manage team', label: 'Manage Team', path: '/cti-tool'}, {icon: 'team requests', label: 'Team Requests', path: '/settings'}, {icon: 'account requests', label: 'Account Requests', path: '/asdasdaw'}]}/>
            </div>
            <div>
                <TopNavbar logo/>
            </div>
            <h3>{'<Banner></Banner>'}</h3>
            <Banner title='Welcome to AMS Tools' subtitle='The support hub information' image='/images/banners/home.svg'/>
            <h3>{'<Button></Button>'}</h3>
            <div style={{display: 'flex', columnGap: '2rem', rowGap: '2rem', flexWrap: 'wrap'}}>
                <Button>Button 1</Button>
                <Button icon='home'>Button 2</Button>
                <Button icon='home' textSize={18}>Button 2 18px</Button>
                <Button icon='home' highlight>Button 2</Button>
                <Button icon='home' active>Button 2</Button>
                <Button icon='home' color='green'>Button 3</Button>
                <Button icon='home' color='blue' highlight>Button 3</Button>
                <Button icon='home' color='blue' highlight disabled>Button Disabled</Button>
                <Button icon='home' color='red' iconPosition='right'>Button 4</Button>
                <Button icon='home' disabled>Button Disabled</Button>
                <Button icon='settings'/>
                <Button icon='cti tool' tooltip='CTI Tool'/>
                <Button icon='cti tool' tooltip='CTI Tool Disabled' disabled/>
                <Button type='text' icon='cti tool' >CTI Tool</Button>
                <Button type='text' >CTI Tool</Button>
                <Button type='text' color='blue'>CTI Tool</Button>
                <Button type='text' color='blue' disabled>CTI Tool</Button>
                <Button type='icon' icon='cti tool' />
                <Button type='icon' icon='cti tool' color='navyBlue'/>
                <Button type='icon' icon='cti tool' disabled/>
                <Button type='menu' icon='cti tool' >CTI Tool</Button>
                <Button type='menu' >CTI Tool</Button>
                <Button type='menu' color='blue'>CTI Tool</Button>
                
            </div>
            <h3>{'<CardButton></CardButton>'}</h3>
            <div style={{display: 'flex', columnGap: '2rem', rowGap: '2rem', flexWrap: 'wrap'}}>
                <CardButton icon='notification board' label='Notification Board' description='Look for notifications' onClick={() => console.log('click')}/>
                <CardButton icon='create notification' label='Create Notification' description='Create a global notification or to your team' onClick={() => console.log('click')}/>
                <CardButton active icon='manage notification' label='Manage Notifications' description='Edit, delete or search for your notifications' onClick={() => console.log('click')}/>
            </div>
            <div style={{display: 'flex', columnGap: '2rem', rowGap: '2rem', flexWrap: 'wrap'}}>
                <CardButton color='blue' icon='info' label='General' description='Visible to all AMS Tools user' onClick={() => console.log('click')}/>
                <CardButton active color='blue' icon='info' label='General' description='Visible to all AMS Tools user' onClick={() => console.log('click')}/>
                <CardButton color='yellow' icon='warning' label='warning' iconType='rounded' description='Only visible to the teams leaders' onClick={() => console.log('click')}/>
                <CardButton active color='yellow' icon='warning' label='warning' iconType='rounded' description='Only visible to the teams leaders' onClick={() => console.log('click')}/>
                <CardButton color='red' icon='important' label='Important' description='Only visible to your team members' onClick={() => console.log('click')}/>
                <CardButton active color='red' icon='important' label='Important' description='Only visible to your team members' onClick={() => console.log('click')}/>
            </div>
            <div style={{display: 'flex', columnGap: '2rem', rowGap: '2rem', flexWrap: 'wrap'}}>
                <CardButton icon='cti tool' label='CTI Tool' description='Create resolutions for your incidents.' image='/images/thumbnails/cti tool.png' style={{width: '300px'}} onClick={() => console.log('click')}>
                <div style={{display: 'flex', columnGap: '1rem', paddingTop: '1rem', margin: '0 1.25rem 1.25rem', borderTop: '1px solid #EAEAEA'}}>
                    <Button type='icon' icon='resolution' tooltip='Create Resolution' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                    <Button type='icon' icon='search' tooltip='Search Resolution' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                    <Button type='icon' icon='stats' tooltip='Resolution Stats' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                </div>
                </CardButton>
                <CardButton icon='sla time' label='SLA Time' description='Check out the SLA time for incidentes and service requests in each priority.' image='/images/thumbnails/sla time.png' style={{width: '300px'}} onClick={() => console.log('click')}/>
                <CardButton icon='notification center' label='Notification Center' description='See and create notifications' image='/images/thumbnails/notification center.png' style={{width: '300px'}} onClick={() => console.log('click')}>
                    <div style={{display: 'flex', columnGap: '1rem', paddingTop: '1rem', margin: '0 1.25rem 1.25rem', borderTop: '1px solid #EAEAEA'}}>
                        <Button type='icon' icon='notification board' tooltip='Notification Board' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                        <Button type='icon' icon='create notification' tooltip='Create Notification' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                        <Button type='icon' icon='manage notifications' tooltip='Manage Notification' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                    </div>
                </CardButton>
                <CardButton icon='team manager' label='Team Manager' description='Manage your team and their requests.' image='/images/thumbnails/team manager.png' style={{width: '300px'}} onClick={() => console.log('click')}>
                    <div style={{display: 'flex', columnGap: '1rem', paddingTop: '1rem', margin: '0 1.25rem 1.25rem', borderTop: '1px solid #EAEAEA'}}>
                        <Button type='icon' icon='manage team' tooltip='Manage Team' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                        <Button type='icon' icon='team requests' tooltip='Team Requests' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                        <Button type='icon' icon='account requests' tooltip='Account Requests' iconSize={28} iconWeight={300} onClick={() => console.log('icon click')}/>
                    </div>
                </CardButton>
            </div>
            <h3>{'<Header></Header>'}</h3>
            <Header text='Header' />
            <Header text='Header' rule/>
            <Header icon='tools' text='Header' color='theme'/>
            <Header icon='tools' text='Header' color='theme' >
                <Button icon='back'/>
                <Button icon='forward'/>
                <Button icon='close'/>
            </Header>
            <h3>{'<TextInput></TextInput>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '300px'}}>
                <TextInput label='Text Input' placeholder='Text something to input' input={textInput}/>
                <TextInput type='number' max='10' min='-10' label='Number Input' placeholder='Select a number' input={numberInput}/>
                <TextInput icon='calendar_today' label='Text Input' placeholder='Text something to input' input={textInput}/>
                <TextInput label='Text Input' optional placeholder='Text something to input' input={textInput}/>
                <TextInput label='Text Input' optional='- This field is optional' placeholder='Text something to input' input={textInput}/>
                <TextInput label='Text Input' labelOnLeft placeholder='Text something to input' input={textInput}/>
                <TextInput icon='calendar_today' label='Text Input' disabled placeholder='Text something to input' input={textInput}/>
                <TextInput label='Text Input' placeholder='Text something to input' input={invalidTextInput}/>
                <TextInput icon='calendar_today' label='Text Input' placeholder='Text something to input' input={invalidTextInput}/>
                <TextInput type='area' label='Text Input' placeholder='Text something to input' input={textInput}/>
                <TextInput type='area' resizable label='Text Input' placeholder='Text something to input' input={textInput}/>
            </div>
            <h3>{'<Select></Select>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '300px'}}>
                <Select label='Select Input' placeholder='Select something to input' input={selectInput} options={selectStringOptions}/>
                <Select label='Select Input' placeholder='Select something to input' input={invalidSelectInput} options={selectObjectOptions}/>
                <Select label='Select Input' labelOnLeft placeholder='Select something to input' input={selectInput} options={selectStringOptions}/>
                <Select icon='calendar_today' label='Select Input' placeholder='Select something to input' input={selectInput} options={selectStringOptions}/>
            </div>
            <h3>{'<Search></Search>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '300px'}}>
                <Search input={searchInput} />
                <Search placeholder='Search for something' input={searchInput}/>
            </div>
            <h3>{'<DateTimeInput></DateTimeInput>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '300px'}}>
                <DateTimeInput input={dateInput} />
                <DateTimeInput placeholder='Select a date' input={dateInput}/>
                <DateTimeInput placeholder='This has a max date' max='2023-01-15' input={dateMaxInput}/>
                <DateTimeInput placeholder='This has a min date' min='2023-01-05' input={dateMinInput}/>
                <DateTimeInput placeholder='This has a min and max date' min='2023-01-05' max='2023-01-15' input={dateMinInput}/>
                <DateTimeInput type='time' input={timeInput} />
                <DateTimeInput type='time' placeholder='Select a time' input={timeInput}/>
                <DateTimeInput type='datetime' input={dateTimeInput} />
                <DateTimeInput type='datetime' placeholder='Select a date and a time to enter the input' input={dateTimeInput}/>
                <DateTimeInput type='datetime' placeholder='This has a max date and time' max='2023-01-15T18:08' input={dateTimeMaxInput}/>
                <DateTimeInput type='datetime' placeholder='This has a min date and time' min='2023-01-05T08:05' input={dateTimeMinInput}/>
            </div>
            <h3>{'<DateTimeRangeInput></DateTimeRangeInput>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '300px'}}>
                <DateTimeRangeInput input={dateRangeInput} />
                <DateTimeRangeInput placeholderFrom='Select a date from' placeholderTo='Select a date to' input={dateRangeInput}/>
                <DateTimeRangeInput placeholderTo='Min date' min='2023-01-05' input={dateRangeMinInput}/>
                <DateTimeRangeInput placeholderTo='Max date' max='2023-01-15' input={dateRangeMaxInput}/>
                <DateTimeRangeInput placeholderFrom='Min and max date' placeholderTo='Min and max date' min='2023-01-05' max='2023-01-15' input={dateRangeMinMaxInput}/>
                <DateTimeRangeInput type='time' input={timeRangeInput} />
                <DateTimeRangeInput type='time' placeholderFrom='Select a time from' placeholderTo='Select a time to' input={timeRangeInput}/>
                <DateTimeRangeInput type='datetime' input={dateTimeRangeInput} />
                <DateTimeRangeInput type='datetime' placeholderFrom='Select a date and a time in this input from' placeholderTo='Select a date and a time in this input to' input={dateTimeRangeInput}/>
                <DateTimeRangeInput type='datetime' placeholderTo='Min date' min='2023-01-05T00:00' input={dateTimeRangeMinInput}/>
                <DateTimeRangeInput type='datetime' placeholderTo='Max date' max='2023-01-15T00:00' input={dateTimeRangeMaxInput}/>
                <DateTimeRangeInput type='datetime' placeholderFrom='Min and max date' placeholderTo='Min and max date' min='2023-01-05T00:00' max='2023-01-15T00:00' input={dateTimeRangeMinMaxInput}/>
            </div>
            <h3>{'<WeekInput></WeekInput>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '400px'}}>
                <WeekInput label='Week input' input={weekInput} />
                <WeekInput label='Week input' lang='pt' input={weekInput} />
                <WeekInput label='Week input' lang='es' input={weekInput} />
            </div>
            <h3>{'<MonthInput></MonthInput>'}</h3>
            <div style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '400px'}}>
                <MonthInput label='Month input' input={monthInput} />
                <MonthInput label='Month input' year='2017' month='2' input={monthInput} />
                <MonthInput label='Month input' year='2022' month='4'  input={monthInput} />
            </div>
            <h3>{'<BadgeIcon></BadgeIcon>'}</h3>
            <div style={{display: 'flex', columnGap: '2rem'}}>
                <BadgeIcon name='locked' />
                <BadgeIcon name='important' />
                <BadgeIcon name='refused' />
                <BadgeIcon name='canceled' />
                <BadgeIcon name='expired' />
                <BadgeIcon name='update' />
                <BadgeIcon name='approved' />
                <BadgeIcon name='pending' />
                <BadgeIcon name='warning' />
            </div>
            <h3>{'<UserPhoto></UserPhoto>'}</h3>
            <div style={{display: 'flex', columnGap: '2rem'}}>
                <UserPhoto user='Dereck Rukopf Grimm'/>
                <UserPhoto user='Fernando Guerra' badge='locked' color={randomColor()}/>
                <UserPhoto user='Dereck Rukopf Grimm' badge='important' color={randomColor()}/>
                <UserPhoto user='Fernando Guerra' badge='refused' color={randomColor()}/>
                <UserPhoto user='Dereck Rukopf Grimm' badge='canceled' color={randomColor()}/>
                <UserPhoto user='Fernando Guerra' badge='update' color={randomColor()}/>
                <UserPhoto user='Dereck Rukopf Grimm' badge='approved' color={randomColor()}/>
                <UserPhoto user='Fernando Guerra' badge='pending' color={randomColor()}/>
                <UserPhoto user='Dereck Rukopf Grimm' badge='warning' color={randomColor()}/>
            </div>
            <h3>{'<List></List> -> <Notification></Notification>'}</h3>
            <List>
                <Notification author='Dereck Rukopf Grimm' date='02/02/2022' type='important' visibility='global' avatarColor={randomColor()}>
                    Permission to create resolutions in the support group LATAM-RDS-Brasil
                </Notification>
                <Notification author='Fernando Guerra' date='02/02/2022' type='approved' visibility='team' avatarColor={randomColor()}>
                    Permission to create resolutions in the support group LATAM-RDS-Brasil
                </Notification>
                <Notification author='Dereck Rukopf Grimm' date='02/02/2022' type='update' visibility='private' avatarColor={randomColor()}>
                    Permission to create resolutions in the support group LATAM-RDS-Brasil
                </Notification>
                <Notification author='Fernando Guerra' date='02/02/2022' type='important' visibility='accountable' avatarColor={randomColor()}>
                    Permission to create resolutions in the support group LATAM-RDS-Brasil
                </Notification>
                <Notification author='Dereck Rukopf Grimm' date='02/02/2022' type='pending' visibility='leaders' leaders={['Track leaders']} avatarColor={randomColor()}>
                    Permission to create resolutions in the support group LATAM-RDS-Brasil
                </Notification>
                <Notification author='Fernando Guerra' date='02/02/2022' visibility='leaders' leaders={['Track leaders', 'Managers', 'Administrators']} avatarColor={randomColor()}>
                    Permission to create resolutions in the support group LATAM-RDS-Brasil
                </Notification>
            </List>
            {/* <h3>{'<List></List> -> <TeamMember/>'}</h3>
            <List>
                <TeamMember name='Dereck Rukopf Grimm' id='D123456' email='dereck_grimm@cargill.com' avatarColor={randomColor()}/>
                <TeamMember name='Fernando Guerra' id='F000123' email='fernando_guerra@cargl-thirdparty.com' status='pending' avatarColor={randomColor()}/>
                <TeamMember name='Dereck Rukopf Grimm' id='D123456' email='dereck_grimm@cargill.com' avatarColor={randomColor()}/>
                <TeamMember name='Fernando Guerra' id='F000123' email='fernando_guerra@cargl-thirdparty.com' status='pending' avatarColor={randomColor()}/>
                <TeamMember name='Dereck Rukopf Grimm' id='D123456' email='dereck_grimm@cargill.com' status='locked' avatarColor={randomColor()}/>
                <TeamMember name='Fernando Guerra' id='F000123' email='fernando_guerra@cargl-thirdparty.com' avatarColor={randomColor()}/>
            </List>
            <h3>{'<List></List> -> <TeamRequest/>'}</h3>
            <List>
                <TeamRequest requester='Dereck Rukopf Grimm' type='access' status='pending' creationDate='01/02/2023' data={{tool: 'CTI Tool'}}/>
                <TeamRequest requester='Fernando Guerra' type='role change' status='approved' creationDate='01/02/2023' data={{previousAccountable: {name: 'Previous Accountable'}, newAccountable: {name: 'New Accountable'}, previousRole: 'Analyst', newRole: 'Track Leader'}}/>
                <TeamRequest requester='Dereck Rukopf Grimm' type='accountable change' status='refused' creationDate='01/02/2023' data={{previousAccountable: {name: 'Previous Accountable'}, newAccountable: {name: 'New Accountable'}}}/>
                <TeamRequest requester='Fernando Guerra' type='cti application' status='canceled' creationDate='01/02/2023' data={{application: 'JDE E1'}}/>
            </List> */}
            <h3>{'<List></List> -> <UserRequest/>'}</h3>
            <List>
                {userRequestData.map((request, idx) => <UserRequest key={idx} request={request} />)}
            </List>
            {/* <h3>{'<List></List> -> <AccountRequest/>'}</h3>
            <List>
                <AccountRequest status='pending' creationDate='01/02/2023' role='Analyst' requester={{name: 'Dereck Rukopf Grimm', email: 'dereck_grimm@cargill.com'}}/>
                <AccountRequest status='approved' creationDate='01/02/2023' role='Track leader' requester={{name: 'Fernando Guerra', email: 'fernando_guerra@cargl-thirdparty.com'}}/>
                <AccountRequest status='refused' creationDate='01/02/2023' role='Manager' requester={{name: 'Dereck Rukopf Grimm', email: 'dereck_grimm@cargill.com'}}/>
                <AccountRequest status='canceled' creationDate='01/02/2023' role='Administrador' requester={{name: 'Fernando Guerra', email: 'fernando_guerra@cargl-thirdparty.com'}}/>
                <AccountRequest status='expired' creationDate='01/02/2023' role='Analyst' requester={{name: 'Dereck Rukopf Grimm', email: 'dereck_grimm@cargill.com'}}/>
            </List> */}
            <h3>{'<List></List> -> <Resolution/>'}</h3>
            <List>
                <Resolution data={resolutions[0]}/>
                <Resolution data={resolutions[1]}/>
                <Resolution data={resolutions[2]}/>
            </List>
            <h3>{'<List></List> -> <Access/>'}</h3>
            <List>
                <Access access='cti tool' onRemove={() => console.log('removed')}/>
                <Access access='notification center' onRemove={() => console.log('removed')}/>
                <Access access='applications catalog' onRemove={() => console.log('removed')}/>
                <Access access='team manager' onRemove={() => console.log('removed')}/>
            </List>
            <h3>{'<List></List> -> <AccessRequest/>'}</h3>
            <List>
                <AccessRequest access='cti tool' creationDate='02/02/2022' onCancel={() => console.log('canceled')}/>
                <AccessRequest access='notification center' creationDate='02/02/2022' onCancel={() => console.log('canceled')}/>
                <AccessRequest access='applications catalog' creationDate='02/02/2022' onCancel={() => console.log('canceled')}/>
                <AccessRequest access='team manager' creationDate='02/02/2022' onCancel={() => console.log('canceled')}/>
            </List>
            <h3>{'<List></List> -> <LIQuickAccess/>'}</h3>
            <List>
                <LIQuickAccess module='cti tool' onRemove={() => console.log('removed')} onMoveUp={() => console.log('up')} onMoveDown={() => console.log('down')}/>
                <LIQuickAccess module='notification center' onRemove={() => console.log('removed')} onMoveUp={() => console.log('up')} onMoveDown={() => console.log('down')}/>
                <LIQuickAccess module='applications catalog' onRemove={() => console.log('removed')} onMoveUp={() => console.log('up')} onMoveDown={() => console.log('down')}/>
                <LIQuickAccess module='team manager' onRemove={() => console.log('removed')} onMoveUp={() => console.log('up')} onMoveDown={() => console.log('down')}/>
            </List>
            {/* <h3>{'<List></List> -> <AllowedApplication/>'}</h3>
            <List>
                <AllowedApplication application='RDS' supportGroup='LATAM-RDS-Brazil' onRemove={() => console.log('removed')}/>
                <AllowedApplication application='JDE E1' supportGroup='LATAM-Non-JDE' onRemove={() => console.log('removed')}/>
                <AllowedApplication application='Master Saf' supportGroup='LATAM-Supported-Applications' onRemove={() => console.log('removed')}/>
                <AllowedApplication application='RDS Web' supportGroup='LATAM-RDS-Brazil' onRemove={() => console.log('removed')}/>
            </List>
            <h3>{'<List></List> -> <ApplicationPermissionRequest/>'}</h3>
            <List>
                <ApplicationPermissionRequest application='RDS' supportGroup='LATAM-RDS-Brazil'creationDate='02/02/2022'  onCancel={() => console.log('canceled')}/>
                <ApplicationPermissionRequest application='JDE E1' supportGroup='LATAM-Non-JDE'creationDate='02/02/2022'  onCancel={() => console.log('canceled')}/>
                <ApplicationPermissionRequest application='Master Saf' supportGroup='LATAM-Supported-Applications'creationDate='02/02/2022'  onCancel={() => console.log('canceled')}/>
                <ApplicationPermissionRequest application='RDS Web' supportGroup='LATAM-RDS-Brazil'creationDate='02/02/2022'  onCancel={() => console.log('canceled')}/>
            </List> */}
        </div>
    );
}

export default ComponentsLibrary;