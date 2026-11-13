const classificationData = [
    {
        classification: "Application Bug",
        tier5: ['IT SQL EXECUTION', 'ROOT CAUSE ANALYSIS', 'MANUAL ACTION REQUIRED', 'USER TRAINING-HOW TO']  //Adicionado USER TRAINING-HOW TO
    },
    {
        classification: 'Change Implementation',
        tier5: ['CHANGE IMPLEMENTATION']
    },
    {
        classification: 'Data Issue',
        tier5: ['DATA ERROR', 'DATA LEGACY']
    },
    {  
        classification: "Duplicated",
        tier5: ['ISSUE RESOLVED/DUPLICATED']
    },
    {  
        classification: "Infrastructure",
        tier5: ['COT INTEGRATION', 'AFIP INTEGRATION', 'PERFORMANCE ISSUE', 'SEFAZ INTEGRATION', 'IMPLEMENTATION CHANGE', 'IMPROVEMENT NEEDED OR REQUESTED', 'STORAGE PROBLEM']
    },
    {  
        classification: "Monitoring Event",
        tier5: ['SALES UPDATE EXECUTION', 'IT SQL EXECUTION', 'Z-FILE PAYMENT INTERFACE', 'OTHER']
    },
    {  
        classification: "No Support Action",
        tier5: ['NO ACTION NEEDED', 'USER NON RESPONSIVE']
    },
    {  
        classification: "Out of Scope",
        tier5: ['WRONG TEAM ASSIGNMENT']
    },
    {
        classification: 'Performance',
        tier5: ['PERFORMANCE ISSUE']
    },
    {
        classification: 'Set Up',
        tier5: ['PARAMETERIZATION']
    },
    {  
        classification: "Support",
        tier5: ['SUPPORT ERROR']
    },
    {  
        classification: "User Adoption",
        tier5: ['USER ERROR', 'USER TRAINING-HOW TO', 'USER NON RESPONSIVE']
    },
    {  
        classification: "User Request",
        tier5: ['GENERAL REQUEST', 'IT EXECUTION', 'IT SQL EXECUTION', 'USER ACCESS', 'USER NON RESPONSIVE']
    },
    {
        classification: 'Working as Designed',
        tier5: ['IMPROVEMENT NEEDED OR REQUESTED', 'MANDATORY FIELD MUST CONSIST']
    }
];

export default classificationData;