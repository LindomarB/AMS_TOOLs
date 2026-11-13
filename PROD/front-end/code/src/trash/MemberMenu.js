import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../../../../../../data/app/modules';
import AppContext from '../../../../../context/appContext/AppContext';
import Button from '../../../../../Interface/buttons/button/Button';
import Header from '../../../../../Interface/header/Header';
import TextNavbar from '../../../../../Interface/navigation/textNavbar/TextNavbar';
import Rule from '../../../../../Interface/rule/Rule';
import AwayMode from './awayMode/AwayMode';
import Member from './member/Member';
import style from './MemberMenu.module.css';

function MemberMenu(props) {
    const lang = useContext(AppContext).currentLanguage;
    const navigate = useNavigate();

    const routes = modules('team manager', 'manage team').getRoute('member details').routes;
    const accesses = ['account', 'requests', 'remove-member', ...props.member.accesses];
    props.member.accesses.includes('team manager') && accesses.push('team');

    const items = routes.reduce((items, route) => {
        if(!accesses.includes(route.name)) return items;
        
        if(route.routes && route.routes.length) {
            items.push({
                sectionName: route.label[lang],
                items: route.routes.map(nestedRoute => ({
                    label: nestedRoute.label[lang], 
                    path: `${route.relativePath}/${nestedRoute.relativePath}`
                }))
            });
        } else {
            items.push({
                label: route.label[lang], 
                path: route.relativePath
            });
        }

        return items;
    }, []);

    return (
        <div className={style.MemberMenu}>
            <Header text='Team Member'>
                <Button
                    type='icon'
                    icon='back'
                    onClick={() => navigate(modules('team manager', 'manage team').path)}
                    tooltip='Back'
                /> 
            </Header>
            <Rule className={style.rule}/>
            <Member member={props.member}/>
            {props.member.settings.awayMode && 
                <>
                    <Rule className={style.rule}/>
                    <AwayMode member={props.member}/>
                </>
            }
            <Rule className={style.rule}/>
            <TextNavbar items={items}/>
        </div>
    );
}

export default MemberMenu;