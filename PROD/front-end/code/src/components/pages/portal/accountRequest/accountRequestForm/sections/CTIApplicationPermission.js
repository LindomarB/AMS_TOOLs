import React, { useContext, useEffect, useState } from 'react';
import CheckBox from '../../../../../Interface/inputs/checkBox/CheckBox';
import FetcherContext from '../../../../../context/fetcherContext/FetcherContext';
import useInput from '../../../../../hooks/useInput';
import Text from '../../../../../Interface/Text/Text';
import LoadableContent from '../../../../../Interface/containers/loadableContent/LoadableContent';
import NoDataFound from '../../../../../Interface/noDataFound/NoDataFound';
import Warning from '../../../../../Interface/warning/Warning';

function CTIApplicationPermission(props) {
    const [applicationOptions, setApplicationOptions] = useState();
    const fetcher = useContext(FetcherContext);

    const applications = useInput({
        name: 'applications', 
        initialValue: props.values.applications || []
    });

    useEffect(() => {
        props.setFormSection(props.name, [applications]);
    }, []);

    useEffect(() => {
        if(!props.onConstructionPhase) {
            fetchCTIApplications();
        }
    }, []);

    useEffect(() => {
        if(applicationOptions && role === 'administrator') {
            const values = [];

            for(let group in applicationOptions) {
                applicationOptions[group].forEach(option => values.push(option.value));
            }

            applications.setValue(values);
        }
    }, [applicationOptions]);

    const fetchCTIApplications = async () => {
        let res = null;
        const projection = {
            _id: 1, 
            name: 1, 
            'support group': 1, 
            country: 1
        };

        if(role === 'administrator') {
            res = await fetcher.getApplicationCatalog(
                {
                    query: {status: 'active'}, 
                    settings: {projection}
                }, 
                {
                    awaitingFlag: 'gettingApplicationOptions'
                }
            );
        } else {
            res = await fetcher.getCtiApplicationOptionsForNewAccount({
                query: {accountableId: props.form.get('role', 'accountable').value},
                settings: {projection}
            }, {awaitingFlag: 'gettingApplicationOptions'});
        }

        if(res.ok) {
            const disabled = role === 'administrator';

            const options = res.data.reduce((obj, application) => {
                    if(!obj[application['support group']]) {
                        obj[application['support group']] = [];
                    }
                    
                    obj[application['support group']].push({
                        value: application._id, 
                        label: application.name,
                        disabled
                    });

                    return obj;
            }, {});

            setApplicationOptions(options);
        }
    }

    const role = props.form.get('role', 'role').value;
    let label = 'As an Administrator you have access to all applications in the CTI Tool';

    if(role !== 'administrator') {
        label = (
            <>
                <Text size={16} weight={500} style={{display: 'block'}}>
                    {role === 'analyst'
                        ? 'Select the applications you need permission to create resolutions in the CTI Tool'
                        : 'Select the applications you are responsible in the CTI Tool'
                    }
                </Text>
                <Text color='grey' style={{display: 'block', marginTop: '0.5rem'}}>
                    {`${role !== 'analyst'? 'Your team will only be able to request access to the applications that you are responsible.\n\n' : ''}If you do not select any application, you won't be able to create resolutions for incidents, but you can still see the resolution dashboards.`}
                </Text>
            </>
        );
    }

    return (
        <LoadableContent loading={fetcher.awaiting.gettingApplicationOptions}>
            {!applicationOptions &&
                <NoDataFound icon='error'>
                    Unable to load application options. Please try again later.
                </NoDataFound>
            }
            {applicationOptions && Object.keys(applicationOptions).length
                ? (
                    <CheckBox 
                        label={label}
                        input={applications}
                        options={applicationOptions}
                        sort
                        selectGroup
                    />
                )
                : (
                    <Warning level='low' title='Attention' header>
                        The selected accountable does not have access to any CTI Tool application and therefore cannot give you access. Because of this, you will not be able to create resolutions for incidents, but you will still be able to see resolution dashboards.
                    </Warning>
                )
            }
        </LoadableContent>
    );
}

CTIApplicationPermission.defaultProps = {
    name: 'cti applications',
    condition: (form) => form.role.accesses.includes('cti tool')
}

export default CTIApplicationPermission;