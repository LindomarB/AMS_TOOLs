import React from "react";
import randomColor from "../../../../functions/randomColor";
import List from "../../../Interface/list/List";
import Notification from "../../notifications/notification/Notification";
import Section from "../../../Interface/section/Section";
import style from './LastNotifications.module.css';

function LastNotifications(props) {
    const listItems = data.map((datum, idx) => <Notification key={idx} {...datum}>{datum.text}</Notification>);

    return (
        <Section className={style.LastNotifications} title='Last Notifications' color='theme' icon='notification board'>
            <List className={style.list} noDataMessage='No notification was found'>
                {listItems}
            </List>
        </Section>
    );
}

export default LastNotifications;

const data = [
    {
        author: 'Dereck Rukopf Grimm',
        date: '02/02/2022',
        type: 'important',
        visibility: 'global',
        avatarColor: randomColor(),
        text: 'Permission to create resolutions in the support group LATAM-RDS-Brasil'
    },
    {
        author: 'Fernando Guerra',
        date: '02/02/2022',
        type: 'approved',
        visibility: 'team',
        avatarColor: randomColor(),
        text: 'Permission to create resolutions in the support group LATAM-RDS-Brasil'
    },
    {
        author: 'Dereck Rukopf Grimm',
        date: '02/02/2022',
        type: 'update',
        visibility: 'private',
        avatarColor: randomColor(),
        text: 'Permission to create resolutions in the support group LATAM-RDS-Brasil'
    },
    {
        author: 'Fernando Guerra',
        date: '02/02/2022',
        type: 'important',
        visibility: 'accountable',
        avatarColor: randomColor(),
        text: 'Permission to create resolutions in the support group LATAM-RDS-Brasil'
    },
    {
        author: 'Dereck Rukopf Grimm',
        date: '02/02/2022',
        type: 'pending',
        visibility: 'leaders',
        leaders: ['Track leaders'],
        avatarColor: randomColor(),
        text: 'Permission to create resolutions in the support group LATAM-RDS-Brasil'
    },
    {
        author: 'Fernando Guerra',
        date: '02/02/2022',
        visibility: 'leaders',
        leaders: ['Track leaders', 'Managers', 'Administrators'],
        avatarColor: randomColor(),
        text: 'Permission to create resolutions in the support group LATAM-RDS-Brasil'
    },
]
