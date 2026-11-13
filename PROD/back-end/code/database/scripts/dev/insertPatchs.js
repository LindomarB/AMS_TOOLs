const Patch = require("../../../model/Patch");

const patchs = [
    // {
    //     version: '1.0.0',
    //     date: new Date('2023-04-20'),
    //     notes: [
    //         {
    //             module: 'AMS Tools',
    //             changes: [
    //                 'Wellcome to AMS Tools!',
    //                 'AMS Tools is a suit composed of several tools created to help the AMS operation in its daily tasks.'
    //             ]
    //         },
    //         {
    //             module: 'Application Catalog',
    //             changes: [
    //                 'Use the Application Catalog to find information about the supported applications.'
    //             ]
    //         },
    //         {
    //             module: 'CTI Tool',
    //             changes: [
    //                 'CTI Tool is designed to create and manage resolutions for incidents. With its resources it is possible:',
    //                 {
    //                     type: 'list',
    //                     list : [
    //                         'Create, edit, copy and delete resolutions',
    //                         'Search and export data',
    //                         'Check stats about resolutions',
    //                         'Explore the Tiers Tree'
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'SLA Time',
    //             changes: [
    //                 'Each priority of incidents and service requests has your own SLA (Service Level Agreement) time for response and resolution. Meet this time limit characterizes the service as successful.',
    //                 'With the SLA Time tool is possible to check the SLA for each case.'
    //             ]
    //         },
    //         {
    //             module: 'Team Manager',
    //             changes: [
    //                 'Team Manager is the main tool for Administrators, Manager and Track Leaders to manage their team. With it is possible:',
    //                 {
    //                     type: 'list',
    //                     list : [
    //                         'Add and remove members',
    //                         'Approve or refuse team requests and new account requests',
    //                         'Manage members access',
    //                         'Check team stats and structure'
    //                     ]
    //                 }
    //             ]
    //         },
    //     ]
    // },
    // {
    //     version: '1.0.1',
    //     date: new Date('2023-08-17T21:00:00z'),
    //     notes: [
    //         {
    //             module: 'AMS Tools',
    //             submodules: [
    //                 {
    //                     name: 'Account request',
    //                     changes: [
    //                         'Some chages were made here',
    //                         {
    //                             type: 'list',
    //                             list: [
    //                                 `The 'Name' field is now automatically formatted in order to normalize the data in the database. Names previously entered in uppercase will be changed.`,
    //                                 `Fixed an issue that prevented a user from requesting access if their last request had expired`
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'General',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list: [
    //                                 `The validation logic for inputs that need external data has been improved to prevent incorrect validation in case of a delay in the server's response`
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'CTI Tool',
    //             submodules: [
    //                 {
    //                     name: 'Edit resolution',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Fixed an issue that prevented PBI and KBA from updating when they were removed`,
    //                                 `Fixed an issue that prevented Tier 5 from resetting when the classification was automatically changed to 'Application Bug'`,
    //                                 `When returning from editing to searching, the resolution will still be selected`,
    //                             ]
    //                         }
    //                     ]
    //                 }                    
    //             ]
    //         }
    //     ]
    // },
    // {
    //     version: '1.1.0',
    //     date: new Date('2023-08-26T21:00:00z'),
    //     notes: [
    //         {
    //             module: 'AMS Tools',
    //             submodules: [
    //                 {
    //                     name: 'Account request',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'Tool options are now accompanied by their descriptions.'
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Forgot you password',
    //                     changes: [
    //                         `The 'Forgot your password' option is now available on the login screen.`,
    //                         'Although it is not yet the definitive version of the function, for now it allows you to request a password reset from your accountable.'
    //                     ]
    //                 },
    //                 {
    //                     name: 'Interface',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'Improved the styling of several components, making the interface more responsive to different screen types.',
    //                                 `Now when placing the mouse over the side menu, the tool's resources will appear to facilitate navigation.`
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Notifications',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'System notification icons have been changed, making them more intelligible.'
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'CTI Tool',
    //             changes: [
    //                 {
    //                     type: 'list',
    //                     list : [
    //                         'Fixed an issue that created a wrong field within user settings when granting access to the CTI Tool via a request.',
    //                         'The INCIDENT, PRIORITY, COUNTRY, APPLICATION and SUPPORT GROUP fields are removed from the Helix text.'
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'Settings',
    //             submodules: [
    //                 {
    //                     name: 'General',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'Improve mismatched route messages.'
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Accountables',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'Fixed an issue that prevented pending requests from being refreshed when submitting an add or change request.',
    //                                 'When you select a accountable from the list to view their details, he will be highlighted.',
    //                                 `The 'Accountable Change' request icon has been changed.`
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'CTI Tool',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                  'Now when selecting an application to request access, its information will be displayed.',
    //                                 `Changed request name 'CTI Application Permission' to 'CTI Application Access'.`
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Tools',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'Now when selecting a tool to access its description will be displayed.'
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]           
    //         },
    //         {
    //             module: 'SLA Time',
    //             changes: [
    //                 'The SLA for extended priority has been fixed.'
    //             ]
    //         },
    //         {
    //             module: 'Team Manager',
    //             submodules: [
    //                 {
    //                     name: 'Account Requests',
    //                     changes: [
    //                         `'Account Request' has been removed. Account requests now go together with team requests.`,
    //                         `At first, we understand that when requesting an account, the user is not yet part of the team and therefore the request should be separate. Other than that difference, all requests follow the same patterns and keeping them separate turned out to be confusing for some users.`,
    //                         `We believe that this change will benefit accountables by concentrating all requests in the same place, in addition to facilitating the maintenance of the function.`
    //                     ]
    //                 },
    //                 {
    //                     name: 'Member Details',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Fixed an issue that crashed the interface during loading due to delays connecting to the server.`,
    //                                 `Now when the user requests help to reset his password through 'Forgot your password' on the login screen, the 'Reset Password' option will be available. Through it you can generate a link and send it to the user to reset his password. Accountables will always be notified when a password reset is requested.`,
    //                                 `Improve mismatched route messages.`
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Team Organization',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Fixed an issue that caused an error if CTI Tool user data was not found. This situation only happened due to an error that occurred during the creation of user configurations if he requested access to the tool via request (this error has also been corrected).`,
    //                                 `The selected user is now highlighted.`
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Team Requests',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Account requests now are together with team requests.`,
    //                                 `The accountable's notifications and alerts are now also updated when refreshing requests, improving the synchronization of the list of requests with the AMS Tools interface.`
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]   
    //         }
    //     ]
    // },
    // {
    //     version: '1.1.1',
    //     date: new Date('2023-08-31T18:00:00z'),
    //     notes: [
    //         {
    //             module: 'AMS Tools',
    //             submodules: [
    //                 {
    //                     name: 'Interface',
    //                     changes: [
    //                         `When using the browser's translator, the icons were transformed into text, which distorted the interface and prevented its use. This is due to the fact that the icons are referred to by their names in the HTML code and the translator also translate them.`,
    //                         `The issue has been fixed, however components that are dynamically rendered based on their dimensions (such as tooltips) will not display correctly due to the way the browser performs translations.`,
    //                         `Please pay attention to the input options when using the translator. We're letting it act on the labels, which won't always make sense with some terms that don't have a translation (like the applications' support groups). However, the value of the inputs is preserved and there will be no errors in the data sent to the server.`
    //                     ]
    //                 },
    //                 {
    //                     name: 'User',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Fixes an issue that prevented user data from automatically updating (including notifications).`
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'CTI Tool',
    //             submodules: [
    //                 {
    //                     name: 'Create Resolution',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 'Fixes a problem that prevented the correct validation of the PBI when the number entered was already linked to a set of tiers different from those used in the resolution.'
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     name: 'Search',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Changed the name of the 'Created by you' filter preset to 'Your resolutions'.`,
    //                                 `Changed the name of the filter preset 'Created by your team' to 'Resolutions by your team'.`,
    //                                 `Fixed the 'Add to favorites' button text not being toggled to 'Remove from favorites'.`
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'Settings',
    //             submodules: [
    //                 {
    //                     name: 'CTI Tool',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                  'Fixes an issue that did not show support group in application information during access request.'
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]           
    //         },
    //         {
    //             module: 'SLA Time',
    //             changes: [
    //                 'Fixes service requests resolution times.'
    //             ]
    //         },
    //         {
    //             module: 'Team Manager',
    //             submodules: [
    //                 {
    //                     name: 'Member Details',
    //                     changes: [
    //                         {
    //                             type: 'list',
    //                             list : [
    //                                 `Fixes an issue that allowed the accountable to remove a user's access to an application that he did not share.`,
    //                                 `Fixes an issue that allowed the accountable to remove a user's access to a support group that he did not share.`
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]   
    //         }
    //     ]
    // },
    // {
    //     version: '1.2.0',
    //     date: new Date('2023-09-10T18:00:00z'),
    //     notes: [
    //         {
    //             module: 'Support',
    //             changes: [
    //                 'We are introducing our support center! We hope you enjoy our new features:',
    //                 {
    //                     type: 'list',
    //                     list: [
    //                         'Consult our FAQ and contribute to its growth.',
    //                         'Download our user guide.',
    //                         'Report bugs.',
    //                         'Request help.',
    //                         'Send us your suggestions.',
    //                         'Check out the release notes.'
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             module: 'About',
    //             changes: [
    //                 `The 'About' section has been moved into the new support module.`
    //             ]
    //         }
    //     ]
    // },
    {
        version: '1.2.1',
        date: new Date('2023-10-02T17:00:00z'),
        notes: [
            {
                module: 'AMS Tools',
                submodules: [
                    {
                        name: 'General',
                        changes: [
                            {
                                type: 'list',
                                list: [
                                    `Fixed a bug that prevented filters from showing options in alphabetical order.`
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                module: 'CTI Tool',
                submodules: [
                    {
                        name: 'Resolutions',
                        changes: [
                            {
                                type: 'list',
                                list: [
                                    `Now when an incident is classified as 'Duplicated' the main incident will also appear in the Helix text.`
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

async function insertPatchs() {
    for(let patch of patchs) {
        const model = new Patch(patch);
        const result = await model.save();

        if(!result.ok) console.log(result)
    }
}

module.exports = insertPatchs;