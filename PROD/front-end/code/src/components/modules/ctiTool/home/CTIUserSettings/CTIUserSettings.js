import React, { useContext, useState } from 'react';
import Section from '../../../../Interface/section/Section';
import Tabs from '../../../../Interface/navigation/tabs/Tabs';
import Button from '../../../../Interface/buttons/button/Button';
import modules from '../../../../../data/app/modules';
import style from './CTIUserSettings.module.css';
import PermissionsGranted from '../../../settings/routes/ctiTool/applications/permissionsGranted/PermissionsGranted';
import UserContext from '../../../../context/userContext/UserContext';
import AccessesGranted from '../../../settings/routes/ctiTool/supportGroups/accessesGranted/AccessesGranted';

function CTIUserSettings(props) {
    const [setting, setSetting] = useState('Applications');
    const userCtx = useContext(UserContext);

    const handleOnClickTab = (tab) => {
        setSetting(tab);
    }

    const settingOptions = ['Applications', 'Support groups'];

    const sectionChildren = (
        <div className={style.sectionChildren}>
            <Tabs 
                className={style.tabs} 
                tabClassName={style.tab} 
                tabs={settingOptions} 
                pill 
                selectedTab={setting} 
                onClick={handleOnClickTab}
            />
            <Button 
                type='icon'
                icon='account settings' 
                tooltip='Manage your settings'
                path={modules('account settings').getRoute('cti tool', setting.toLowerCase()).path}
            />
        </div>
    );
    
    let settingsList = null;

    if(setting === 'Applications')  {
        settingsList = <PermissionsGranted className={style.list} user={userCtx.user} disableRemove disableHeader/>
    } else if(setting === 'Support groups') {
        settingsList = <AccessesGranted className={style.list} user={userCtx.user} disableRemove disableHeader/>
    }

    return (
        <Section 
            className={style.CTIUserSettings} 
            title={setting === 'Applications'? 'Your Applications' : 'Your Support Groups'} 
            color='theme' 
            icon='check_circle' 
            headerChildren={sectionChildren}
        >
            {settingsList}
        </Section>
    );
}

export default CTIUserSettings;