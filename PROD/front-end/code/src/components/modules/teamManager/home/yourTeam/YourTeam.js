import React, { useContext, useEffect, useState } from "react";
import Tabs from "../../../../Interface/navigation/tabs/Tabs";
import Section from "../../../../Interface/section/Section";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import ReportCard from "../../../../Interface/report/reportCard/ReportCard";
import style from './YourTeam.module.css';
import UserContext from "../../../../context/userContext/UserContext";

function YourTeam(props) {
    const [data, setData] = useState([]);
    const [type, setType] = useState('overview');
    const fetcher = useContext(FetcherContext);
    const user = useContext(UserContext).user;

    useEffect(() => {
        fetchTeamStats();
    }, [type]);

    const fetchTeamStats = async () => {
        const query = props.user? {'accountable._id': props.user._id} : {};
        const res = await fetcher.getTeamStats(type, {query});
        setData(res.ok? res.data : []);
    }

    const tabs = [
        {
            text: 'Overview',
            value: 'overview'
        }
    ];

    if(user.accesses.includes('cti tool')) {
        tabs.push({
            text: 'CTI Tool',
            value: 'cti-tool'
        });
    }

    const sectionChildren = (
        <Tabs 
            className={style.tabs} 
            tabs={tabs} 
            pill 
            selectedTab={type} 
            onClick={(tab) => setType(tab)}
        />
    );

    return (
        <Section 
            className={`${style.YourTeam} ${props.className || ''}`} 
            title={props.header || 'Your Team'}
            color='theme' 
            icon='group' 
            headerChildren={sectionChildren}
        >
            <ReportCard 
                className={style.reportCard} 
                data={data.filter(data => data.value.length)}
                loading={fetcher.awaiting[`getTeamStats-${type}`]}
                noDataIcon='no team'
                noDataText='You do not have a team in this category'
            />
        </Section>
    );
}

export default YourTeam;