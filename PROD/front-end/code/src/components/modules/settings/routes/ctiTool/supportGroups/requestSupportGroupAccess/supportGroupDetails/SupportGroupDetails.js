import React, { useContext } from 'react';
import Icon from '../../../../../../../Interface/icons/icon/Icon';
import Text from '../../../../../../../Interface/Text/Text';
import UserContext from '../../../../../../../context/userContext/UserContext';
import style from './SupportGroupDetails.module.css';
import Header from '../../../../../../../Interface/header/Header';
import Legend from '../../../../../../../Interface/legend/Legend';

function SupportGroupDetails(props) {
    const userCtx = useContext(UserContext);

    const userApplicationPermissions = userCtx.getCTIApplication(null, props.supportGroup.name).map(application => application._id);

    const applications = props.supportGroup.applications.map(application => (
        <Text key={application._id} li>
            {userApplicationPermissions.includes(application._id)
                ? <Icon name='check_circle' color='green' weight={300}/>
                : <Icon name='close' color='red' weight={300}/>
            }
            {application.name}
        </Text>
    ));

    const legends = [
        {
            icon: {
                name: 'check_circle',
                color: 'green',
                weight: 300
            },
            label: 'You have access'
        },
        {
            icon: {
                name: 'close',
                color: 'red',
                weight: 300
            },
            label: 'You do not have access'
        }
    ];

    return (
        <div className={style.SupportGroupDetails}>
            <Header 
                className={style.header}
                text={`${props.supportGroup.name}`}
            />
            <ul className={style.applications}>
                <Text color='grey' weight={500}>Applications</Text>
                {applications}
            </ul>
            <Legend 
                // className={style.legends}
                legends={legends}
            />
        </div>
    );
}

export default SupportGroupDetails;