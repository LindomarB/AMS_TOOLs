import React, { useContext } from "react";
import FetcherContext from "../../../../../context/fetcherContext/FetcherContext";
import { useNavigate } from "react-router-dom";
import modules from "../../../../../../data/app/modules";
import useInput from "../../../../../hooks/useInput";
import SettingSection from "../../../../settings/components/settingSection/SettingSection";
import InputButton from "../../../../../Interface/containers/inputButton/InputButton";
import Text from "../../../../../Interface/Text/Text";
import Button from "../../../../../Interface/buttons/button/Button";
import TextInput from "../../../../../Interface/inputs/textInput/TextInput";
import style from './RemoveMember.module.css';
import Warning from "../../../../../Interface/warning/Warning";
import UserContext from "../../../../../context/userContext/UserContext";
import ReportData from "../../../../../Interface/report/reportData/ReportData";
import capitalize from "../../../../../../functions/text/capitalize";
import BadgeIcon from "../../../../../Interface/icons/badgeIcon/BadgeIcon";
import ModalContext from "../../../../../context/modalContext/ModalContext";
import KeepMembers from "./keepMembers/KeepMembers";

function RemoveMember(props) {
    const fetcher = useContext(FetcherContext);
    const userCtx = useContext(UserContext);
    const modalCtx = useContext(ModalContext);
    const navigate = useNavigate();

    const password = useInput({
        name: 'password', 
        required: true
    });

    const handleOnRemove = async (membersToKeep = false) => {
        const res = await fetcher.removeMember({
            userId: props.member._id, 
            membersToKeep,
            password: password.value
        });

        if(res.data.checkMembersToKeep) {
            modalCtx.show(
                <KeepMembers 
                    accountable={props.member}
                    members={res.data.members}
                    onConfirm={handleOnRemove}
                />
            );
        } else if(res.ok || res.status === 499) {
            userCtx.refresh();
            navigate(modules('team manager', 'manage team').path);
        }

        return res;
    }

    const singlePrimary = props.member.accountables.filter(accountable => accountable.primary).length < 2;
    const isPrimaryMember = props.member.accountables.find(accountable => accountable._id === userCtx.user._id).primary;

    if(singlePrimary || !isPrimaryMember) {
        const accountables = ['administrator', 'manager', 'track leader'].reduce((accountables, role) => {
            const accountablesWithRole = props.member.accountables.filter(accountable => accountable.role === role);

            if(!accountablesWithRole.length) return accountables;

            accountables.push((
                <ReportData 
                    key={role} 
                    iconProps={{
                        backgroundClassName: style.reportIcon,
                        name: role,
                        filled: true
                    }}
                    title={capitalize(role)} 
                    value={accountablesWithRole.map(accountable => ({
                        title: accountable.name,
                        value: accountable.primary? <BadgeIcon className={style.badge} name='directly accountable' iconProps={{size: 22}}/> : ' '
                    }))}
                />
            ));

            return accountables;
        }, []);

        accountables.push((
            <ReportData 
                className={style.member}
                key={props.member.profile.role} 
                iconProps={{
                    backgroundClassName: style.reportIcon,
                    name: props.member.profile.role,
                    filled: true,
                    color: 'darkOrange'
                }}
                value={props.member.profile.name}
                valueProps={{weight: 600}}
            />
        ));

        if(!isPrimaryMember) {
            return (
                <SettingSection childrenContainerClassName={style.RemoveMember} title='Remove Team Member'>
                    <div className={style.text}>
                        <Text color='grey'>
                            {props.member.profile.name} is an indirect member of your team and therefore cannot be removed directly. You can only remove members who have you as the directly accountable.
                        </Text>
                        <Text color='grey'>
                            If you want to remove {props.member.profile.name} from your team, check your accountables:
                        </Text>
                        <div className={style.accountables}>
                            <div className={style.line}></div>
                            {accountables}
                        </div>
                        <Warning title border level='low'>
                            When removing a member, your team structure will be re-evaluated and some indirect members may be removed.
                        </Warning>
                    </div>
                </SettingSection>
            );
        } else {
            return (
                <SettingSection childrenContainerClassName={style.RemoveMember} title='Remove Team Member'>
                    <div className={style.text}>
                        <Text color='grey'>
                            You cannot remove {props.member.profile.name} from your team as you are solely directly accountable. To remove him/her from your team, ask {props.member.profile.name} to request an accountable change.
                        </Text>
                        <div className={style.accountables}>
                            <div className={style.line}></div>
                            {accountables}
                        </div>
                    </div>
                </SettingSection>
            );
        }
    }

    return (
        <SettingSection childrenContainerClassName={style.RemoveMember} title='Remove Team Member'>
            <div>
                <Text color='grey'>
                    {`Before removing ${props.member.profile.name} from your team, be aware of:`}<br/>
                </Text>
                <ul className={style.ul}>
                    <Text li weight={600} color='grey'>All access under your responsibility will be removed;</Text>
                    <Text li weight={600} color='grey'>Any pending requests for you will be canceled;</Text>
                    <Text li weight={600} color='grey'>{props.member.profile.name}'s team structure will be re-evaluated and other accountables may also be removed;</Text>
                    <Text li weight={600} color='grey'>Your team structure will be re-evaluated and some indirect members may be removed;</Text>
                </ul>
            </div>
            <InputButton className={style.inputButton}>
                <TextInput
                    className={style.input}
                    type='password'
                    input={password}
                    placeholder='Type your password to proceed'
                    onPressEnter={() => handleOnRemove()} 
                />
                <Button
                    icon='remove user' 
                    iconWeight={300} 
                    color='red' 
                    disabled={!password.isValid} 
                    onClick={() => handleOnRemove()}
                    awaiting={fetcher.awaiting.removeMember}
                >Remove Member</Button>
            </InputButton>
            {/* {singlePrimary &&
                <Warning className={style.warning} title type='low'>
                    {`Since you are sole primary accountable of ${props.member.profile.name}, will be set as new primary accountables.`}
                </Warning>
            } */}
            <Warning className={style.warning} title border level='high'>
                This action may result in the loss of user data and cannot be undone.
            </Warning>
        </SettingSection>
    );
}

export default RemoveMember;