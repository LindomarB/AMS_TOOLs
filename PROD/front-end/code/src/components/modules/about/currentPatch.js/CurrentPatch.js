import React, { useContext, useEffect, useState } from 'react';
import FetcherContext from '../../../context/fetcherContext/FetcherContext';
import SettingSection from '../../settings/components/settingSection/SettingSection';
import ReportDataGrid from '../../../Interface/report/reportDataGrid/ReportDataGrid';
import LoadableContent from '../../../Interface/containers/loadableContent/LoadableContent';
import Patch from '../patch/Patch';
import Rule from '../../../Interface/rule/Rule';

function CurrentPatch(props) {
    const [currentPatch, setCurrentPatch] = useState(null);
    const fetcher = useContext(FetcherContext);

    useEffect(() => {
        fetchCurrentPatch();
    }, []);

    const fetchCurrentPatch = async () => {
        const res = await fetcher.getPatchs({
            settings: {
                sort: {
                    date: -1
                },
                limit: 1
            }
        }, {
            awaitingFlag: 'getCurrentPatch'
        });

        if(res.ok) {
            setCurrentPatch(res.data[0]);
        }
    }

    const data = [];

    if(currentPatch) {
        data.push(
            {
                title: 'Version',
                value: currentPatch.version
            },
            {
                title: 'Date',
                value: new Date(currentPatch.date).toLocaleDateString()
            }
        );
    }

    return (
        <LoadableContent loading={!currentPatch || fetcher.awaiting.getCurrentPatch}>
            <SettingSection title='About AMS Tools'>
                <ReportDataGrid data={data}/>
            </SettingSection>
            <Rule/>
            <Patch 
                patch={currentPatch}
                headerProps={{
                    rule: false
                }}
            />
        </LoadableContent>
    );
}

export default CurrentPatch;