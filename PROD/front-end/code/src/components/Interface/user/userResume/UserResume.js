import React from 'react';
import Loading from '../../loaders/loading/Loading';
import NoDataFound from '../../noDataFound/NoDataFound';
import getData from './data/getData';
import style from './UserResume.module.css';
import Rule from '../../rule/Rule';

function UserResume(props) {
    if(props.loading) {
        return (
            <div className={`${style.UserResume} ${props.className || ''}`}>
                <Loading />
            </div>
        );
    }

    if(!props.user) {
        return (
            <div className={`${style.UserResume} ${props.className || ''}`}>
                <NoDataFound icon='no user' text='No user found'/>
            </div>
        );
    }
    
    const userData = [];

    props.info.forEach(info => {
        if(getData[info]) {
            const data = getData[info](props.user, props.notShow[info], props.removeHeader);

            if(data) {
                userData.push((
                    <div key={info} className={`${style.info} ${props.infoClassName || ''}`}>
                        {data}
                    </div>
                ));

                userData.push(<Rule key={`rule-${info}`} />)
            }
        }
    });

    userData.pop();

    return (
        <div className={`${style.UserResume} ${props.className || ''}`}>
            {userData}
        </div>
    );
}

UserResume.defaultProps = {
    info: ['profile', 'team', 'accesses', 'cti tool'],
    notShow: {}
};

export default UserResume;