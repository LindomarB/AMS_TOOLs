import React from 'react';
import statusData from '../../../../data/app/statusData';
import capitalize from '../../../../functions/text/capitalize';
import ReportData from '../../report/reportData/ReportData';
import sortByField from '../../../../functions/array/sortByField';
import Rule from '../../rule/Rule';

function Meta(props) {
    const data = [
        {
            title: 'Approvers',
            value: props.request.approvers.map(approver => `${approver.name} (${approver.cargillId})`),
            icon: 'approver'
        },
        {
            title: 'Requested on',
            value: new Date(props.request.meta.createdOn).toLocaleDateString(),
            icon: 'calendar full'
        },
        {
            title: 'Responded on',
            value: null, 
            icon: 'reply'
        },
        {
            title: 'Status',
            value: capitalize(props.request.status), 
            iconProps: {
                name: statusData[props.request.status].icon,
                color: statusData[props.request.status].color,
            }
        }
    ];

    let respondedOn = data[2];
    let refusalReason = null;

    if(props.request.status !== 'canceled' && props.request.mandatoryApprovers) {
        const mandatoryApprovers = props.request.mandatoryApprovers.map(
            approvers => approvers.map(
                approverId => props.request.approvers.find(
                    approver => approver._id === approverId
        )));

        const responses = mandatoryApprovers.reduce((responses, approvers) => {
            const approver = approvers.find(approver => approver.respondedOn);

            if(approver) {
                responses.push({
                    title: approver.name,
                    value: new Date(approver.respondedOn).toLocaleDateString()
                });

                if(approver.refusalReason) {
                    refusalReason = approver.refusalReason;
                }
            } else {
                responses.push(
                    ...approvers.map(approver => {
                        return {
                            title: approver.name,
                            value: null
                        };
                    })
                );
            }

            return responses;
        }, []);

        respondedOn.value = sortByField(responses, 'title');
    } else {
        const approver = props.request.approvers.find(approver => approver.respondedOn);

        if(approver) {
            respondedOn.value = [{
                title: approver.name,
                value: new Date(approver.respondedOn).toLocaleDateString()
            }];

            if(approver.refusalReason) {
                refusalReason = approver.refusalReason;
            }
        }
    }

    if(refusalReason) {
        data.push({
            title: 'Refusal Reason',
            value: refusalReason,
            icon: 'sms_failed',
            iconProps: {color: 'red'}
        });
    }

    if(props.request.status === 'canceled') {
        respondedOn = null;
    }
   
    const items = data.map(datum => datum && <ReportData key={datum.title} {...datum}/>);

    return (
        <>
            <Rule />
            {items}
        </>
    );
}

export default Meta;