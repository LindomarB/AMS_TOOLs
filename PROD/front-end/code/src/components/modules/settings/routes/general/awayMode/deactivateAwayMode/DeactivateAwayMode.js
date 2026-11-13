import React, { useContext } from 'react';
import Button from '../../../../../../Interface/buttons/button/Button';
import ReportDataGrid from '../../../../../../Interface/report/reportDataGrid/ReportDataGrid';
import Text from '../../../../../../Interface/Text/Text';
import SettingSection from '../../../../components/settingSection/SettingSection';
import FetcherContext from '../../../../../../context/fetcherContext/FetcherContext';

function DeactivateAwayMode(props) {
    const fetcher = useContext(FetcherContext);
    const awayMode = props.user.settings.awayMode;

    const handleOnUnsetAwayMode = async () => {
        const res = await fetcher.unsetAwayMode({userId: props.user._id});
        if(res.ok) props.refreshUser();
    }

    const period = [
        {title: 'From', value: new Date(awayMode.startDate).toLocaleDateString()},
        {title: 'To', value: new Date(awayMode.endDate).toLocaleDateString()},
        {title: 'Message', value: awayMode.message}
    ];
    console.log(new Date(awayMode.startDate))
    let temporaryAccountable = null;

    if(awayMode.temporaryAccountable) {
        temporaryAccountable = [
            {title: 'Name', value: temporaryAccountable.name},
            {title: 'Email', value: temporaryAccountable.email},
            {title: 'Cargill ID', value: temporaryAccountable.cargillId},
        ];
    }

    return (
        <>
            <SettingSection title='Away Mode Activated'>
                <Text color='grey'>You defined a period of abscence. When it starts, your team will be notified.</Text>
                <ReportDataGrid data={period}/>
                {props.user.profile.role !== 'analyst' && (
                        temporaryAccountable
                        ? (
                            <>
                                <Text color='grey' style={{marginTop: '1rem'}}>Your team requests will be send to</Text>
                                <ReportDataGrid data={temporaryAccountable} />
                            </>
                        )
                        : <Text color='grey' style={{marginTop: '1rem'}}>Your team requests will be send to {props.user.accountable.name}.</Text>
                    )
                }
                <Button
                    style={{marginTop: '1rem'}}
                    color='red'
                    icon='close'
                    onClick={handleOnUnsetAwayMode}
                >Deactive Away Mode</Button>
            </SettingSection>
        </>
    );
}

export default DeactivateAwayMode;