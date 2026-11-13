import React, { useContext } from "react";
import AppContext from "../../../context/appContext/AppContext.js";
import IncidentInfo from "../../../cti-tool/categorization/incidentInfo/IncidentInfo";
import Form from "../../../cti-tool/form/Form.js";
import Classification from "../../../cti-tool/categorization/classification/Classification";
import style from "./CTICategorization.module.css";
import Problem from "../../../cti-tool/categorization/problem/Problem.js";
import Solution from "../../../cti-tool/categorization/solution/Solution.js";
import BreachReason from "../../../cti-tool/categorization/breachReason/BreachReason.js";
import useBrowserStorage from "../../../hooks/useBrowserStorage.js";
import Tiers from "../../../cti-tool/categorization/tiers/Tiers.js";
import classificationData from "../../../../data/classificationData.js";
import useInputValue from "../../../hooks/useInputValue.js";
import InputValidators from "./InputValidators.js";
import Review from "../../../cti-tool/categorization/resolution/Review.js";

function CTICategorization(props) {
    const [categorizationData, setCategorizationData] = useBrowserStorage({
        key: "categorizationForm",
        initialValue: {currentSection: 0, formInputs: {}}
    });

    const onChangeInputValue = (input) => {
        setCategorizationData(curSt => {
            const newState = {...curSt, formInputs: {...curSt.formInputs}};
            newState.formInputs[input.inputName] = input.value;
            return newState;
        });
    } 

    const supportGroup = useInputValue({
        inputName: "supportGroup",
        initialValue: categorizationData.formInputs.supportGroup || "",
        required: true,
        onChangeValue: onChangeInputValue
    } );

    const application = useInputValue({
        inputName: "application",
        initialValue: categorizationData.formInputs.application || "",
        required: true,
        onChangeValue: onChangeInputValue
    } );

    const incident = useInputValue({
        inputName: "incident",
        initialValue: categorizationData.formInputs.incident || "",
        required: true,
        //validators: [
        //    {
        //        validator: (value) => InputValidators.remedyNumber("inc", value),
        //        invalidMessage: {
        //            en: "The incident number is not in a valid format",
        //            pt: "O número do incidente não está em um formato válido",
        //            es: "El número de incidente no tiene un formato válido"
        //        }
        //    }
        //],
        onChangeValue: onChangeInputValue
    } );

    const priority = useInputValue({
        inputName: "priority",
        initialValue: categorizationData.formInputs.priority || "",
        required: true,
        onChangeValue: onChangeInputValue
    } );

    const country = useInputValue({
        inputName: "country",
        initialValue: categorizationData.formInputs.country || "",
        required: true,
        onChangeValue: (input) => {
            tier1.reset();
            tier2.reset();
            tier3.reset();
            tier4.reset();

            onChangeInputValue(input);
        }
    } );

    const pbi = useInputValue({
        inputName: "pbi",
        initialValue: categorizationData.formInputs.pbi || "",
        validators: [
            {
                validator: (value) => InputValidators.remedyNumber("pbi", value),
                invalidMessage: {
                    en: "The PBI number is not in a valid format",
                    pt: "O número do PBI não está em um formato válido",
                    es: "El número de PBI no tiene un formato válido"
                }
            }
        ],
        onChangeValue: onChangeInputValue
    } );

    const kba = useInputValue({
        inputName: "kba",
        initialValue: categorizationData.formInputs.kba || "",
        validators: [
            {
                validator: (value) => InputValidators.remedyNumber("kba", value),
                invalidMessage: {
                    en: "The KBA number is not in a valid format",
                    pt: "O número do KBA não está em um formato válido",
                    es: "El número de KBA no tiene un formato válido"
                }
            }
        ],
        onChangeValue: onChangeInputValue
    } );

    const classification = useInputValue({
        inputName: "classification",
        initialValue: categorizationData.formInputs.classification || "",
        required: true,
        onChangeValue: (input) => {
            if(tier5.value) {
                const newTierOptionsHasCurrentValue = classificationData.some(data => {
                    if(data.classification.toUpperCase() === classification.value.toUpperCase()) {
                        return data.tier5.includes(tier5.value);
                    }

                    return false;
                });
    
                if(!newTierOptionsHasCurrentValue) {
                    tier5.reset();
                }
            }

            onChangeInputValue(input);
        }
    } );

    const tier1 = useInputValue({
        inputName: "tier1",
        initialValue: categorizationData.formInputs.tier1 || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const tier2 = useInputValue({
        inputName: "tier2",
        initialValue: categorizationData.formInputs.tier2 || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const tier3 = useInputValue({
        inputName: "tier3",
        initialValue: categorizationData.formInputs.tier3 || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const tier4 = useInputValue({
        inputName: "tier4",
        initialValue: categorizationData.formInputs.tier4 || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const tier5 = useInputValue({
        inputName: "tier5",
        initialValue: categorizationData.formInputs.tier5 || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const problem = useInputValue({
        inputName: "problem",
        initialValue: categorizationData.formInputs.problem || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const diagnosisMatchProblem = useInputValue({
        inputName: "diagnosisMatchProblem",
        initialValue: categorizationData.formInputs.diagnosisMatchProblem || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const isReopening = useInputValue({
        inputName: "isReopening",
        initialValue: categorizationData.formInputs.isReopening || "",
        required: true,
        onChangeValue: onChangeInputValue
    });
    
    const reopeningReason = useInputValue({
        inputName: "reopeningReason",
        initialValue: categorizationData.formInputs.reopeningReason || "",
        required: true,
        validators: [
            {
                validator: (value, dependencyValues) => InputValidators.conditionalRequired(value, (dependencyValues.isReopening === "yes")),
                invalidMessage: ""
            }
        ],
        dependencies: [isReopening],
        onChangeValue: onChangeInputValue
    });

    const solution = useInputValue({
        inputName: "solution",
        initialValue: categorizationData.formInputs.solution || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const usedSql = useInputValue({
        inputName: "usedSql",
        initialValue: categorizationData.formInputs.usedSql || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const sqlCode = useInputValue({
        inputName: "sqlCode",
        initialValue: categorizationData.formInputs.sqlCode || "",
        required: true,
        validators: [
            {
                validator: (value, dependencyValues) => InputValidators.conditionalRequired(value, (dependencyValues.usedSql === "yes")),
                invalidMessage: ""
            }
        ],
        dependencies: [usedSql],
        onChangeValue: onChangeInputValue
    });
    
    const slaLost = useInputValue({
        inputName: "slaLost",
        initialValue: categorizationData.formInputs.slaLost || "",
        required: true,
        onChangeValue: onChangeInputValue
    });

    const breachWasWiproFault = useInputValue({
        inputName: "breachWasWiproFault",
        initialValue: categorizationData.formInputs.breachWasWiproFault || "",
        required: true,
        validators: [
            {
                validator: (value, dependencyValues) => InputValidators.conditionalRequired(value, (dependencyValues.slaLost === "yes")),
                invalidMessage: ""
            }
        ],
        dependencies: [slaLost],
        onChangeValue: onChangeInputValue
    });

    const breachReason = useInputValue({
        inputName: "breachReason",
        initialValue: categorizationData.formInputs.breachReason || "",
        required: true,
        validators: [
            {
                validator: (value, dependencyValues) => InputValidators.conditionalRequired(value, (dependencyValues.slaLost === "yes")),
                invalidMessage: ""
            }
        ],
        dependencies: [slaLost],
        onChangeValue: onChangeInputValue
    });

    const appCtx = useContext(AppContext);
    const lexicon = appCtx.lexicon.theme.categorization;

    const onChangeSection = (section) => {
        setCategorizationData(curSt => {
            const newState = {...curSt, formInputs: {...curSt.formInputs}};
            newState.currentSection = section;
            return newState;
        });
    }

    const validateInputs = (inputs) => {
        return Object.values(inputs).every(input => input.isValid);
    }

    const inputs = {
        incidentInfo: {supportGroup, application, incident, priority, country, pbi, kba},
        classification: {classification},
        tiers: {tier1, tier2, tier3, tier4, tier5},
        problem:{problem, diagnosisMatchProblem, isReopening, reopeningReason},
        solution: {solution, usedSql, sqlCode},
        breachReason:{slaLost, breachWasWiproFault, breachReason}
    };

    const sections = [
        {
            name: lexicon.incidentInfo.title,
            component: <IncidentInfo inputs={inputs.incidentInfo}/>,
            isValid: validateInputs(inputs.incidentInfo),
            inputs: inputs.incidentInfo
        },
        {
            name: lexicon.classification.title,
            component: <Classification inputs={inputs.classification}/>, 
            isValid: validateInputs(inputs.classification),
            inputs: inputs.classification
        },
        {
            name: "Tiers",
            component: (
                <Tiers 
                    inputs={inputs.tiers} 
                    maxTier={Object.keys(inputs.tiers).length}
                    country={inputs.incidentInfo.country.value} 
                    classification={inputs.classification.classification.value}
                />
            ),
            isValid: validateInputs(inputs.tiers),
            inputs: inputs.tiers,
        },
        {
            name: lexicon.problem.title,
            component: <Problem inputs={inputs.problem}/>,
            isValid: validateInputs(inputs.problem),
            inputs: inputs.problem
        },
        {
            name: lexicon.solution.title,
            component: <Solution inputs={inputs.solution}/>,
            isValid: validateInputs(inputs.solution),
            inputs: inputs.solution
        },
        {
            name: "Breach Reason",
            component: <BreachReason inputs={inputs.breachReason}/>,
            isValid: validateInputs(inputs.breachReason),
            inputs: inputs.breachReason
        },
        {
            name: lexicon.resolution.title,
            component: <Review formFields={categorizationData.formInputs}/>,
            isValid: true
        }
    ];

    return (
        <Form 
            className={style.CTICategorization}
            sections={sections} 
            currentSection={categorizationData.currentSection} 
            onChangeSection={onChangeSection} 
            formFields={categorizationData.formInputs}
        />
    );
}

export default CTICategorization;