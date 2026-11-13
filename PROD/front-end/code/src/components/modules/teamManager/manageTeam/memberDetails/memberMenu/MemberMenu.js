import React from 'react';
import { useNavigate } from 'react-router-dom';
import modules from '../../../../../../data/app/modules';
import Button from '../../../../../Interface/buttons/button/Button';
import Header from '../../../../../Interface/header/Header';
import Rule from '../../../../../Interface/rule/Rule';
import AwayMode from './awayMode/AwayMode';
import Member from './member/Member';
import style from './MemberMenu.module.css';
import RoutesMenu from '../../../../../Interface/navigation/routesMenu/RoutesMenu';

function MemberMenu(props) {
    const navigate = useNavigate();

    if(!props.member) return null;

    return (
        <div className={style.MemberMenu}>
            {/* <Header text='Team Member'>
                <Button
                    type='icon'
                    icon='back'
                    onClick={() => navigate(modules('team manager', 'manage team').path)}
                    tooltip='Back'
                /> 
            </Header> */}
            {/* <Rule className={style.rule}/> */}
            <Member member={props.member}/>
            {props.member.settings.awayMode && 
                <>
                    <Rule/>
                    <AwayMode member={props.member}/>
                </>
            }
            <Rule/>
            <RoutesMenu 
                user={props.member} 
                routes={modules('team manager', 'manage team').getRoute('member details').routes}
                relative
            />
            <Rule className={style.backButtonRule}/>
            <Button 
                className={style.backButton}
                type='text'
                icon='logout'
                iconProps={{
                    style: {transform: 'rotate(180deg)'}
                }}
                onClick={() => navigate(props.backTo || modules('team manager', 'manage team').path)}
            >Back</Button>
        </div>
    );
}

export default MemberMenu;