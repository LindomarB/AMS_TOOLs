import React, { useContext, useEffect, useState } from "react";
import ReportCard from "../../../../Interface/report/reportCard/ReportCard";
import Section from "../../../../Interface/section/Section";
import FetcherContext from "../../../../context/fetcherContext/FetcherContext";
import style from './TiersTreeStatus.module.css';

function TiersTreeStatus(props) {
    const [data, setData] = useState();
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetcher.getTiersStatus();

        if(res.ok) {
            setData(res.data);
        }
    }

    return (
        <Section className={style.TiersTreeStatus} title='Tiers Tree Status' color='theme' icon='tiers tree'>
            <ReportCard 
                className={style.reportCard} 
                data={data}
                loading={fetcher.awaiting.getTiersStatus}
                noDataIcon='tiers tree'
                noDataText='No tiers were found'
            />
        </Section>
    );
}

export default TiersTreeStatus;