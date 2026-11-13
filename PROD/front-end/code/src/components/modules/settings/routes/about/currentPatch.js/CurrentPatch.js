import React from 'react';
import SettingSection from '../../../components/settingSection/SettingSection';
import ReportDataGrid from '../../../../../Interface/report/reportDataGrid/ReportDataGrid';

function CurrentPatch(props) {
    const data = [
        {
            title: 'Version',
            value: props.patch.version
        },
        {
            title: 'Date',
            value: new Date(props.patch.date).toLocaleDateString()
        },
    ];

    return (
        <SettingSection title='About AMS Tools'>
            <ReportDataGrid data={data}/>
        </SettingSection>
    );
}

export default CurrentPatch;