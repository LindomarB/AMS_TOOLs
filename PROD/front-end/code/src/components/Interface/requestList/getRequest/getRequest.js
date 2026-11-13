import React from 'react';
import Text from '../../Text/Text';
import capitalize from '../../../../functions/text/capitalize';

function Span(props) {
    return (
        <Text span weight='700' transform='capitalize'>{props.children}</Text>
    );
}

function getRequest(request) {
    const {type, data} = request;

    switch(type) {
        case 'new account':
            return {
                icon: 'account requests',
                name: 'Account Request',
                text: <>{'Requesting new account as '}<Span>{data.profile.role}</Span></>
            };
        case 'tool':
            return {
                icon: 'tools',
                name: 'Tool',
                text: <>{'Request access to '}<Span>{data.access}</Span></>
            };
        case 'new accountable':
            return {
                icon: 'new accountable',
                name: 'New Accountable',
                text: <>{'Add '}<Span>{data.newAccountable.name}</Span>{` (${capitalize(data.newAccountable.role)}) to accountables`}</>
            };
        case 'accountable change':
            return {
                icon: 'accountable change',
                name: 'Accountable Change',
                text: <>{'Change accountable from '}<Span>{data.currentAccountable.name}</Span>{' to '}<Span>{data.newAccountable.name}</Span></>
            };
        case 'accountable removal':
            return {
                icon: 'accountable removal',
                name: 'Accountable Removal',
                text: <>{'Revome you as accountable'}</>
            };
        case 'role change':
            return {
                icon: 'role',
                name: 'Role Change',
                text: <>{'Change role from '}<Span>{data.previousRole}</Span>{' to '}<Span>{data.newRole}</Span>{' and accountable from '}<Span>{data.currentAccountable.name}</Span>{' to '}<Span>{data.newAccountable.name}</Span></>
            };
        case 'cti application access':
            return {
                icon: 'cti tool',
                name: 'CTI Tool - Application Access',
                text: <>{'Permission to create resolutions for '}<Span>{data.application.name}</Span>{` (${data.application['support group']})`}</>
            };
        case 'cti support group access':
            return {
                icon: 'cti tool',
                name: 'CTI Tool - Support Group Access',
                text: <>{'Permission to create resolutions for all '}<Span>{data.supportGroup}</Span>{' applications'}</>
            };
        default: 
            return null;
    }
}

export default getRequest;

