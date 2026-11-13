import React from 'react';
import style from './ProfileResume.module.css';
import getProfileData from './getProfileData';
import Loading from '../../loaders/loading/Loading';
import NoDataFound from '../../noDataFound/NoDataFound';

function ProfileResume(props) {
    if(props.loading) {
        return (
            <div className={`${style.ProfileResume} ${props.className || ''}`}>
                <Loading />
            </div>
        );
    }

    if(!props.user) {
        return (
            <div className={`${style.ProfileResume} ${props.className || ''}`}>
                <NoDataFound icon='no user' text='No user found'/>
            </div>
        );
    }
    
    let userData = getProfileData(props.user, props.notShow);

    return (
        <div className={`${style.ProfileResume} ${props.className || ''}`}>
            {userData}
        </div>
    );
}

export default ProfileResume;