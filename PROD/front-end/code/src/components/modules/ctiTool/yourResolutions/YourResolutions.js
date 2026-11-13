import React, { useState } from "react";
import Button from "../../../Interface/buttons/button/Button";
import List from "../../../Interface/list/List";
import Resolution from "../../../Interface/listItems/resolution/Resolution";
import Tabs from "../../../Interface/navigation/tabs/Tabs";
import Section from "../../../Interface/section/Section";
import style from './YourResolutions.module.css';

function YourResolutions(props) {
    const [progress, setProgress] = useState('All');

    const handleOnClickTab = (tab) => {
        setProgress(tab);
    }

    const tabOptions = ['All', 'In Progress', "Complete"];

    const sectionChildren = (
        <div className={style.sectionChildren}>
            <Tabs className={style.tabs} tabClassName={style.tab} tabs={tabOptions} pill selectedTab={progress} onClick={handleOnClickTab}/>
            <Button icon='forward' tooltip='See all your resolutions'/>
        </div>
    );
    let listItems = null;

    switch(progress) {
        case 'All':
            listItems = dataInProgress.map((datum, idx) => <Resolution key={idx} data={datum}/>);
            listItems.push(...dataComplete.map((datum, idx) => <Resolution key={idx} data={datum}/>));
            break;
        case 'In Progress':
            listItems = dataInProgress.map((datum, idx) => <Resolution key={idx} data={datum}/>);
            break;
        case 'Complete':
            listItems = dataComplete.map((datum, idx) => <Resolution key={idx} data={datum}/>);
            break;
        default:
            listItems = [];
    }


    return (
        <Section className={style.YourResolutions} title='Your Resolutions' color='theme' icon='resolution' headerChildren={sectionChildren}>
            <List className={style.list} noDataMessage='No resolution was found'>
                {listItems}
            </List>
        </Section>
    );
}

export default YourResolutions;

const dataComplete = [
    {
        supportGroup: "Support Group 1",
        application: "App_A",
        incident: "INC000123456789",
        priority: "high",
        country: "Argentina",
        classification: "Monitoring Event",
        tier1: "BOLTONS",
        tier2: "CTMS APBU",
        tier3: "LIQUIDACION",
        tier4: "PRE-LIQUIDACION",
        tier5: "SALES UPDATE EXECUTION",
        problem: "This is the problem description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
        diagnosisMatchProblem: "yes",
        isReopening: "yes",
        reopeningReason: "Resolved through User Not Available Process and User Reopened",
        solution: "This is the solution description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.  bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
        usedSql: "yes",
        sqlCode: "CREATE TABLE emp (\nempno INT PRIMARY KEY,\nename VARCHAR(10),\njob VARCHAR(9),\nmgr INT NULL,\nhiredate DATETIME,\nsal NUMERIC(7,2),\ncomm NUMERIC(7,2) NULL,\ndept INT)\nbegin\ninsert into emp values\n    (1,'JOHNSON','ADMIN',6,'12-17-1990',18000,NULL,4)\ninsert into emp values\n    (2,'HARDING','MANAGER',9,'02-02-1998',52000,300,3)\ninsert into emp values\n    (3,'TAFT','SALES I',2,'01-02-1996',25000,500,3)\ninsert into emp values\n    (4,'HOOVER','SALES I',2,'04-02-1990',27000,NULL,3)\ninsert into emp values\n    (5,'LINCOLN','TECH',6,'06-23-1994',22500,1400,4)\ninsert into emp values\n    (6,'GARFIELD','MANAGER',9,'05-01-1993',54000,NULL,4)\ninsert into emp values\n    (7,'POLK','TECH',6,'09-22-1997',25000,NULL,4)\ninsert into emp values\n    (8,'GRANT','ENGINEER',10,'03-30-1997',32000,NULL,2)\ninsert into emp values\n    (9,'JACKSON','CEO',NULL,'01-01-1990',75000,NULL,4)\ninsert into emp values\n    (10,'FILLMORE','MANAGER',9,'08-09-1994',56000,NULL,2)\ninsert into emp values\n    (11,'ADAMS','ENGINEER',10,'03-15-1996',34000,NULL,2)\ninsert into emp values\n    (12,'WASHINGTON','ADMIN',6,'04-16-1998',18000,NULL,4)\ninsert into emp values\n    (13,'MONROE','ENGINEER',10,'12-03-2000',30000,NULL,2)\ninsert into emp values\n    (14,'ROOSEVELT','CPA',9,'10-12-1995',35000,NULL,1)\nend\nCREATE TABLE dept (\ndeptno INT NOT NULL,\ndname VARCHAR(14),\nloc VARCHAR(13))\nbegin\ninsert into dept values (1,'ACCOUNTING','ST LOUIS')\ninsert into dept values (2,'RESEARCH','NEW YORK')\ninsert into dept values (3,'SALES','ATLANTA')\ninsert into dept values (4, 'OPERATIONS','SEATTLE')\nend",
        slaLost: "yes",
        breachWasWiproFault: "yes",
        breachReason: "Incident/Change Timing Misalignment",
        pbi: "PBI000123456789",
        kba: "kba000123456789",
        _id: 1
    }
]

const dataInProgress = [
    {
        supportGroup: "Support Group 2",
        application: "App_F",
        incident: "INC000123456788",
        priority: "medium",
        country: "Brasil",
        classification: "",
        tier1: "",
        tier2: "",
        tier3: "",
        tier4: "",
        tier5: "",
        problem: "This is the problem description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
        diagnosisMatchProblem: "no",
        isReopening: "no",
        solution: "This is the solution description. bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.  bla bla bla loren When there are incidents of the same problem. These cases must be closed and related to the master incident.",
        usedSql: "no",
        slaLost: "yes",
        breachWasWiproFault: "no",
        breachReason: "Interface Auto Resolved",
        pbi: "PBI000123456788",
        _id: 2
    },
    {
        supportGroup: "Support Group 1",
        application: "",
        incident: "INC000123456787",
        priority: "high",
        country: "Brasil",
        classification: "Out of Scope",
        tier1: "INTERFACE TIBCO/OPENTEXT",
        tier2: "",
        tier3: "",
        tier4: "",
        tier5: "",
        problem: "",
        diagnosisMatchProblem: "",
        isReopening: "",
        solution: "",
        usedSql: "",
        slaLost: "",
        _id: 3
    }
]