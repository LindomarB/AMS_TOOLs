import React from 'react';
import capitalize from "../../../../../functions/text/capitalize";
import Text from "../../../Text/Text";
import ReportData from "../../../report/reportData/ReportData";
import Rule from "../../../rule/Rule";
import UserPhoto from "../../userPhoto/UserPhoto";
import DataHeader from './dataHeader/DataHeader';
import style from './getProfileData.module.css';

function getProfileData(user, notShow = [], removeHeader) {
    const data = [];

    const name = user.name || user.profile.name;
    const email = user.email || user.profile.email;
    const cargillId = user.cargillId || user.profile.cargillId;
    const role = user.role || user.profile.role;
    const accountables = user.accountables;
    const createdOn = user.meta && user.meta.createdOn;
    const status = user.status;

    if(name) {
        data.push({
            title: 'Name',
            value: name,
            icon: 'person'
        });
    }

    if(email) {
        data.push({
            title: 'Email',
            value: email,
            icon: 'email'
        });
    }
    
    if(cargillId) {
        data.push({
            title: 'Cargill Id',
            value: cargillId,
            icon: 'id'
        });
    }
    
    if(role) {
        data.push({
            title: 'Role',
            value: capitalize(role),
            icon: 'role'
        });
    }

    if(accountables) {
        data.push({
            title: 'Accountables',
            value: accountables.map(accountable => `${accountable.name} (${accountable.cargillId})`).sort(),
            icon: 'accountable'
        });
    }
    
    if(createdOn) {
        data.push({
            title: 'Created On',
            value: new Date(createdOn).toLocaleDateString(),
            icon: 'login'
        });
    }
    
    if(status) {
        data.push({
            title: 'Status',
            value: capitalize(status),
            icon: status,
            iconProps: {color: status === 'active'
                ? 'green'
                : status === 'away'
                ? 'purple'
                : 'red'
            }
        });
    }

    const info = [];

    if(!removeHeader) {
        const header = DataHeader({
            icon: 'user info' ,
            text: 'profile',
            iconProps: {filled: false}
        });

        info.push(header);
    }

    if(!notShow.includes('user photo')) {
        const avatarColor = user.avatarColor || user.settings.profile.avatarColor;
        
        info.push(
            <div key='user-photo' className={style.header}>
                <UserPhoto
                    className={style.userPhoto} 
                    user={name} 
                    color={avatarColor}
                />
                <Text size={16} weight={500}>{name}</Text>
            </div>
        );

        info.push(<Rule key='user-photo-rule'/>);
    }

    info.push(...
        data.filter(info => !notShow.includes(info.title.toLowerCase()))
        .map(info => <ReportData key={info.title} {...info}/>)
    ); 
    
    return info;
}

export default getProfileData;