import React, { useContext, useEffect, useState } from 'react';
import capitalize from '../../../../../../../functions/text/capitalize';
import FetcherContext from '../../../../../../context/fetcherContext/FetcherContext';
import useInput from '../../../../../../hooks/useInput';
import Button from '../../../../../../Interface/buttons/button/Button';
import DateTimeRangeInput from '../../../../../../Interface/inputs/dateTimeRangeInput/DateTimeRangeInput';
import Select from '../../../../../../Interface/inputs/select/Select';
import TextInput from '../../../../../../Interface/inputs/textInput/TextInput';
import ReportDataGrid from '../../../../../../Interface/report/reportDataGrid/ReportDataGrid';
import Text from '../../../../../../Interface/Text/Text';
import SettingSection from '../../../../components/settingSection/SettingSection';
import style from './ActivateAwayMode.module.css';
import CheckBox from '../../../../../../Interface/inputs/checkBox/CheckBox';

function ActivateAwayMode(props) {
    const [accountableOptions, setAccountableOptions] = useState([]);
    const fetcher = useContext(FetcherContext);

    const period = useInput({
        name: 'period', 
        required: true,
        errorChecker: (value) => value.from && value.to? false : true
    });
    const message = useInput({name: 'message'});
    const temporaryAccountable = useInput({name: 'temporaryAccountable'});
    const notifyTeam = useInput({name: 'notifyTeam'});

    useEffect(() => {
        fetchAccountableOptions();
    }, []);

    const fetchAccountableOptions = async () => {
        const res = await fetcher.getUsers({
            query: {
                accountable: props.user.accountable._id,
                'profile.role': props.user.profile.role,
                'profile.cargillId': {$not: {$eq: props.user.profile.cargillId}},
                status: 'active'
            },
            settings: {
                projection: {
                    _id: 1,
                    profile: {
                        name: 1,
                        email: 1,
                        cargillId: 1
                    }
                },
                sort:{'profile.name': 1}
            }
        });

        if(!res.ok) setAccountableOptions([]);

        const options = res.data.map(user => ({
            value: user._id, 
            label: `${user.profile.name} (${user.profile.cargillId})`,
            profile: Object.keys(user.profile).map(key => ({
                title: capitalize(key),
                value: user.profile[key]
            }))
        }));

        setAccountableOptions(options);
    }

    const handleOnSetAwayMode = async () => {
        let notify = !!notifyTeam.value.length;

        if(notify) {
            const startDate = new Date(`${period.value.from.date}T00:00`).getTime();
            const today = new Date().getTime();
            if(startDate < today) notify = false;
        }

        const res = await fetcher.setAwayMode({
            settings: {
                action: 'activate',
                startDate: period.value.from.date,
                endDate: period.value.to.date,
                timezoneOffset: new Date().getTimezoneOffset(),
                message: message.value,
                temporaryAccountable: temporaryAccountable.value
            },
            userId: props.user._id,
            notifyTeam: notify
        });

        if(res.ok) props.refreshUser();
    }
 
    return (
        <>
            <SettingSection childrenContainerClassName={style.ActivateAwayMode} title='Activate Away Mode'>
                <Text color='grey'>You can define a period where you won’t be available to access the AMS Tools (like vacations, travels or medical conditions). Your team will be notified when your away mode is activated.</Text>
                <DateTimeRangeInput 
                    label='Period of absence'
                    input={period} 
                    min={new Date().toISOString().split('T', 1)[0]}
                />
                <TextInput 
                    className={style.textArea}
                    type='area'
                    input={message} 
                    label='Leave a message to be displayed during your absence'
                    optional
                    placeholder='Your message...'
                />
                {props.user.profile.role !== 'analyst' &&
                    <>
                        <Text>
                            Notifications about your team requests will be sent to your accountable ({props.user.accountable.name}) during your absence.<br/>
                            If you wish, you can define another {capitalize(props.user.profile.role)} to handle your team requests. He will be notified and will be able to approver or refuse requests, but he can’t access the settings of your team members.
                        </Text>

                        <Select 
                            input={temporaryAccountable} 
                            options={accountableOptions}
                            placeholder={`Select a temporary ${capitalize(props.user.profile.role)}`}
                            clearOption
                        />
                        {temporaryAccountable.value && 
                            <ReportDataGrid data={accountableOptions.find(option => option.value === temporaryAccountable.value).profile}/>
                        }
                    </>
                }
                <CheckBox 
                    input={notifyTeam}
                    options={[{value: 'true', label: 'Notify my team about my period of absence'}]}
                />
                <Button
                    color='green'
                    icon='away'
                    disabled={!period.isValid}
                    onClick={handleOnSetAwayMode}
                >Active Away Mode</Button>
            </SettingSection>
        </>
    );
}

export default ActivateAwayMode;