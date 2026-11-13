import React, { useEffect, useRef } from 'react';
import LoadableContent from '../../containers/loadableContent/LoadableContent';
import Card from '../../card/Card';
import ReportData from '../reportData/ReportData';
import NoDataFound from '../../noDataFound/NoDataFound';
import style from './ReportCard.module.css';

/*
    COMPONENT PROPS

    data (required): an array with data objects in the format {title, value, icon}
*/

function ReportCard(props) {
    const elementKey = useRef(0);

    useEffect(() => {
        elementKey.current = elementKey.current + 1;
    }, [props.data]);

    if(!props.data || !props.data.length) {
        return (
            <Card className={`${style.ReportCard} ${props.className || ''}`}>
                <NoDataFound 
                    icon={props.noDataIcon}
                    text={props.noDataText}
                />
            </Card>
        );
    }

    const data = props.data.map(data => (
        <ReportData 
            key={data.title} 
            className={style.reportData} 
            {...data} 
            valueProps={{align: 'end'}} 
            hoverEffect
        />  
    ));
    
    return (
        <Card className={`${props.className || ''}`}>
            <LoadableContent loading={props.loading} elementKey={elementKey.current}>
                <div className={style.dataContainer}>
                    {data}
                </div>
            </LoadableContent>
        </Card>
    );
}

export default ReportCard;