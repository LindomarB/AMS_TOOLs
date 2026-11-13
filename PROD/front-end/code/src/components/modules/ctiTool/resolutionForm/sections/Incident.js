import React, { useContext, useEffect } from 'react';
import useInput from '../../../../hooks/useInput';
import UserContext from '../../../../context/userContext/UserContext';
import remedyNumberValidation from '../../../../../functions/inputValidation/remedyNumberValidation';
import TextInput from '../../../../Interface/inputs/textInput/TextInput';
import Select from '../../../../Interface/inputs/select/Select';
import style from './section.module.css';
import FetcherContext from '../../../../context/fetcherContext/FetcherContext';
import formActions from './formActions/formActions';

function Incident(props) {
    const userCtx = useContext(UserContext);
    const fetcher = useContext(FetcherContext);

    const checkIncidentNumber = async (value) => {
        if(props.resolutionIncident && props.resolutionIncident === value) {
            return {
                isValid: true,
                errorMessage: null
            };
        }

        const res = await fetcher.getResolutions({
            query: {'incident.incident': value},
            settings: {
                projection: {_id: 1}
            }
        });

        if(!res.ok) {
            return {
                isValid: false,
                errorMessage: 'Unable to validate the incident number'
            };
        }

        if(res.data.length) {
            return {
                isValid: false,
                errorMessage: 'There is already a resolution for this incident'
            };
        }

        const resolutionsInProgress = await fetcher.getResolutionsInProgress({
            query: {'incident.incident': value},
            settings: {
                projection: {
                    incident: {
                        incident: 1
                    },
                    meta: {
                        'created by': 1
                    }
                }
            }
        });

        const resolutionInProgress = resolutionsInProgress.data.find(resolution => resolution.meta['created by']._id === userCtx.user._id);
        const userHasResolutionInProgress = resolutionInProgress && resolutionInProgress._id !== props.formId;
        const anotherUserHasResolutionInProgress = resolutionsInProgress.data.find(resolution => resolution.meta['created by']._id !== userCtx.user._id);

        props.setWarning && props.setWarning(
            userHasResolutionInProgress? 'add' : 'remove', 
            'userHasResolutionInProgress', 
            {resolution: resolutionInProgress}
        );

        props.setWarning && props.setWarning(
            anotherUserHasResolutionInProgress? 'add' : 'remove', 
            'anotherUserHasResolutionInProgress', 
            {resolution: anotherUserHasResolutionInProgress}
        );
 
        if(userHasResolutionInProgress) {
            return {
                isValid: true,
                errorMessage: 'You already have a resolution in progress for this incident'
            };
        } else {
            return {
                isValid: true,
                errorMessage: null
            };
        }
    }

    const incident = useInput({
        name: 'incident',
        initialValue: props.values.incident,
        required: true,
        //errorChecker: (value) => {
        //    const isValid = remedyNumberValidation('inc', value);
        //    return isValid? null : 'The incident number is not in a valid format'
        //},
        externalValidator: checkIncidentNumber
    });

    const type = useInput({
        name: 'type',
        initialValue: props.values.type,
        required: true
    });

    const priority = useInput({
        name: 'priority',
        initialValue: props.values.priority,
        required: true
    });

    const country = useInput({
        name: 'country',
        initialValue: props.values.country,
        required: true,
        onChangeValue: () => {
            application.setValue('');
            supportGroup.setValue('');
            formActions.resetTiers(props.form);
        }
    });

    const application = useInput({
        name: 'application',
        initialValue: props.values.application,
        required: true
    });

    const supportGroup = useInput({
        name: 'support group',
        initialValue: props.values['support group'],
        required: true
    });

    useEffect(() => {
        props.setFormSection(props.name, [incident, type, priority, country, application, supportGroup]);
    }, []);

    useEffect(() => {
        const applicationName = application.value;

        if(applicationName) {  
            const application = userCtx.getCTIApplication(applicationName);
            supportGroup.setValue(application? application['support group'] : 'Support group not founded');

            props.setWarning && props.setWarning(
                application.status === 'decommissioned'? 'add' : 'remove', 
                'decommissioned', 
                {application: applicationName}
            );
        }
    }, [application.value]);  

    const typeOptions = [
        {value: 'Incident'},
        {value: 'Service Request'}
    ];

    const priorityOptions = [
        {label: 'Critical', value: 'critical'},
        {label: 'High', value: 'high'},
        {label: 'Medium', value: 'medium'},
        {label: 'Low', value: 'low'},
        {label: 'Extended', value: 'extended'}
    ];

    const userApplications = userCtx.getCTIApplication();

    const countryOptions = Object.keys(
        userApplications.reduce((options, application) => {
            application.country.forEach(country => options[country] = true);
            return options;
        }, {})
    ).filter(country => props.tiersTree.getOrigins().includes(country.toUpperCase()));
        
    const applicationOptions = userApplications.
        filter(application => application.country.includes(country.value)).
        map(application => ({value: application.name}));

    return (
        <>
            <TextInput 
                input={incident}
                label='Incident Number'
                //placeholder='Incident number (ex: INC000123456789)'
                placeholder='Incident number'
                uppercase
            />
            <Select 
                input={type}
                label='Type'
                options={typeOptions}
                placeholder='Select the incident type'
            />
            <Select 
                input={priority}
                label='Priority'
                options={priorityOptions}
                placeholder='Select the incident priority'
            />
            <Select 
                input={country}
                label='Country'
                options={countryOptions}
                placeholder='Select the incident country'
                sort
            />
            <Select 
                input={application}
                label='Application'
                options={applicationOptions}
                placeholder={country.value? 'Select the application' : 'Select the country'}
                locked={!country.value}
                sort
            />
            <TextInput 
                input={supportGroup}
                label='Support Group'
                placeholder='Select the application'
                locked
            />
        </>
    );
}

Incident.defaultProps = {
    name: 'incident',
    subtitle: 'Provide the information about the resolved incident',
    className: style.incident
}

export default Incident;