import modules from "../../../../data/app/modules";
import capitalize from "../../../../functions/text/capitalize";

function getRequestInfo(request, lang) {
    switch(request.type) {
        case 'tool':
             return [
                {
                    title: 'Tool',
                    value: modules(request.data.access).label[lang],
                    icon: 'tools'
                }
            ];
    
        case 'cti application access':
             return [
                {
                    title: 'Application',
                    value: request.data.application.name,
                    icon: 'resolution'
                },
                {
                    title: 'Support Group',
                    value: request.data.application['support group'], 
                    icon: 'support group'
                }
            ];

        case 'cti support group access':
            return [
            {
                title: 'Support Group',
                value: request.data.supportGroup,
                icon: 'support group'
            },
            {
                title: 'Applications',
                value: request.data.applications.map(application => application.name), 
                icon: 'resolution'
            }
        ];
    
        case 'role change':
             return [
                {
                    title: 'Previous Role',
                    value: capitalize(request.data.previousRole),
                    icon: 'role'
                },
                {
                    title: 'Previous Accountable',
                    value: request.data.previousAccountable.name, 
                    icon: 'accountable'
                },
                {
                    title: 'New Role',
                    value: capitalize(request.data.newRole),
                    icon: 'role'
                },
                {
                    title: 'New Accountable',
                    value: request.data.newAccountable.name, 
                    icon: 'accountable'
                }
            ];
    
        case 'new accountable':
             return [
                {
                    title: 'New Accountable',
                    value: request.data.newAccountable.name, 
                    icon: 'new accountable'
                }
            ];

        case 'accountable change':
             return [
                {
                    title: 'Current Accountable',
                    value: request.data.currentAccountable.name, 
                    icon: 'accountable removal'
                },
                {
                    title: 'New Accountable',
                    value: request.data.newAccountable.name, 
                    icon: 'new accountable'
                }
            ];

        case 'accountable removal':
            return [
                {
                    title: 'Accountable',
                    value: request.data.accountable.name, 
                    icon: 'accountable removal'
                }
            ];
    
        case 'new account':
             const info = [
                {
                    title: 'Name',
                    value: request.data.profile.name,
                    icon: 'person'
                },
                {
                    title: 'Email',
                    value: request.data.profile.email, 
                    icon: 'email'
                },
                {
                    title: 'Cargill ID',
                    value: request.data.profile.cargillId, 
                    icon: 'id'
                },
                {
                    title: 'Role',
                    value: capitalize(request.data.profile.role),
                    icon: 'role'
                }
            ];

            if(request.data.profile.role !== 'administrator') {
                info.push({
                    title: 'Accountable',
                    value: request.approvers.map(approver => `${approver.name} (${approver.cargillId})`),
                    icon: 'accountable'
                });
            }

            info.push({
                title: 'Tools',
                value: request.data.accesses.map(access => modules(access).label[lang]), 
                icon: 'tools'
            });

            if(request.data.ctiApplications) {
                info.push({
                    title: 'CTI Application Permissions',
                    value: request.data.ctiApplications.map(application => application.name), 
                    icon: 'resolution'
                });
            }
            
            return info;
    }
}

export default getRequestInfo;