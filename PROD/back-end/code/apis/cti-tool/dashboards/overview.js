const capitalize = require("../../../functions/capitalize");
const Resolution = require("../../../model/resolution/Resolution");


async function getOverview(req, res) {
    const documentModel = {
        'By type': '$incident.type',
        'By priority': '$incident.priority',
        'By country': '$incident.country',
        'By application': '$incident.application',
        'support group': '$incident.support group',
        'classification': '$classification.classification',
        'Tier 1': '$tiers.tier 1',
        'Tier 2': '$tiers.tier 2',
        'Tier 3': '$tiers.tier 3',
        'Tier 4': '$tiers.tier 4',
        'Tier 5': '$tiers.tier 5',
        'pbi': '$pbi.number',
        'kba': '$kba.number',
        'Diagnosis matches the problem': '$problem.diagnosis matches the problem',
        'Reopening': '$problem.is reopening',
        'reopening reason': '$problem.reopening reason',
        'Used SQL': '$solution.used sql',
        'sla lost': '$sla.was lost',
        'wipro fault': '$sla.wipro fault',
        'Breach reason': '$sla.breach reason',
        'exception': '$sla.exception',
        'By assignee': '$meta.created by.name'
    };

    if(req.querySettings.remove) {
        req.querySettings.remove.forEach(section => delete documentModel[section]);
    }

    const resolutions = await Resolution.aggregate([
        {$match: req.query},
        {$project: {
            _id: 0,
            ...documentModel
        }}
    ]);

    const data = Object.keys(documentModel).reduce((data, field) => {
        data[field] = {};
        return data;
    }, {});

    setBreachReasonsData(data, resolutions);
    setDataCount(data, resolutions);
    setPbiKba(data, resolutions);
    const sections = createSections(data);
    setByType(sections, resolutions);
    setByPriority(sections);
    setReopening(sections);
    sortLines(sections['Diagnosis matches the problem'].lines, -1);
    sortLines(sections['Used SQL'].lines, -1);
    sections['PBI / KBA'].lines = sortByOrder(sections['PBI / KBA'].lines, ['PBI', 'KBA']);
    setSLASection(data, sections);
    setBySupportGroup(data, sections, resolutions);
    setByClassification(data, sections, resolutions);

    const json = setSectionsOrder(sections);
    return res.json(json);
}

function sortLines(lines, order = 1) {
    lines.sort((next, cur) => {
        if(next.label > cur.label) return 1 * order;
        else if(next.label < cur.label) return -1 * order;
        else return 0;
    });

    return lines;
}

function sortByOrder(lines, order) {
    return order.reduce((sortedLines, label) => {
        const line = lines.find(line => line.label === label);

        if(line) sortedLines.push(line);

        return sortedLines;
    }, []);
}

function setDataCount(data, resolutions) {
    resolutions.reduce((data, resolution) => {
        for(let field in resolution) {
            data[field][resolution[field]] = (data[field][resolution[field]] || 0) + 1;
        }

        return data;
    }, data);

    for(let section in data) {
        const total = Object.values(data[section]).reduce((total, value) => {
            if(typeof value === 'number') return total + value;
            else return total;
        }, 0);
    
        for(let field in data[section]) {
            data[section][field] = {
                label: capitalize(field),
                value: data[section][field],
                percentage: ((data[section][field] / total) * 100).toFixed(2)
            }
        }
    }
}

function createSections(data) {
    const sections = {};

    for(let key in data) {
        const section = {
            name: key,
            lines: sortLines(Object.values(data[key]))
        }

        sections[key] = section;
    }

    return sections;
}

function setBreachReasonsData(data, resolutions) {
    const breachReasons = resolutions.reduce((breachReasons, resolution) => {
        if(resolution['sla lost'] === 'no') return breachReasons;

        const breachReason = `${resolution['Breach reason']}${resolution.exception === 'yes'? ' (Exception)' : ''}`;

        resolution['Breach reason'] = breachReason;

        if(resolution['wipro fault'] === 'yes') {
            breachReasons.wipro[breachReason] = (breachReasons.wipro[breachReason] || 0) + 1;
        } else {
            breachReasons.notWipro[breachReason] = (breachReasons.notWipro[breachReason] || 0) + 1;
        }

        return breachReasons;
    }, {wipro: {}, notWipro: {}});

    data['wipro breach reason'] = breachReasons.wipro;
    data['not wipro breach reason'] = breachReasons.notWipro;
}

function setByType(sections, resolutions) {
    if(sections['By type'].lines.length > 1) {
        sections['By type'].lines.unshift({
            label: 'All',
            value: resolutions.length,
            percentage: '100.00'
        });
    }
}

function setByPriority(sections) {
    const priorityOrder = [
        'Critical',
        'High',
        'Medium',
        'Low',
        'Extended'
    ];
    
    sections['By priority'].lines = sortByOrder(sections['By priority'].lines, priorityOrder);
}

function setPbiKba(data, resolutions) {
    const totalResolutions = resolutions.length;
    const totalPbi = Object.keys(data.pbi).reduce((total, pbi) => total + data.pbi[pbi].value, 0);
    const totalKba = Object.keys(data.kba).reduce((total, kba) => total + data.kba[kba].value, 0);

    data['PBI / KBA'] = {};

    if(totalPbi) {
        data['PBI / KBA']['PBI'] = {
            label: 'PBI',
            value: totalPbi,
            percentage: ((totalPbi / totalResolutions) * 100).toFixed(2)
        };
    }

    if(totalKba) {
        data['PBI / KBA']['KBA'] = {
            label: 'KBA',
            value: totalKba,
            percentage: ((totalKba / totalResolutions) * 100).toFixed(2)
        };
    }

    delete data.pbi;
    delete data.kba;
}

function setReopening(sections) {
    sortLines(sections['Reopening'].lines, -1);
    
    sections['Reopening'].lines.find(line => {
        if(line.label === 'Yes') {
            line.lines = sections['reopening reason'].lines
            return true;
        }
    
        return false;
    });

    delete sections['reopening reason'];
}

function setSLASection(data, sections) {
    sections['SLA'] = {
        name: 'SLA',
        lines: []
    };

    if(data['sla lost']['no']) {
        sections['SLA'].lines.push(
            {
                ...data['sla lost']['no'],
                label: 'Within'
            }
        );
    }

    if(data['sla lost']['yes']) {
        const lostLines = [];

        if(data['wipro fault']['yes']) {
            lostLines.push({
                ...data['wipro fault']['yes'],
                label: 'Wipro fault',
                lines: sections['wipro breach reason'].lines
            });
        }

        if(data['wipro fault']['no']) {
            lostLines.push({
                ...data['wipro fault']['no'],
                label: 'Not Wipro fault',
                lines: sections['not wipro breach reason'].lines
            });
        }

        sections['SLA'].lines.push(
            {
                ...data['sla lost']['yes'],
                label: 'Lost',
                lines: lostLines.length? lostLines : null
            }
        );

        if(data['exception']['yes']) {
            lostLines.push(
                {
                    ...data['exception']['yes'],
                    label: 'With exception',
                }
            );
        }

        if(data['exception']['no']) {
            lostLines.push(
                {
                    ...data['exception']['no'],
                    label: 'Without exception',
                }
            );
        }
    }

    delete sections['wipro breach reason'];
    delete sections['not wipro breach reason'];
    delete sections['exception'];
    delete sections['sla lost'];
    delete sections['wipro fault'];
}

function setBySupportGroup(data, sections, resolutions) {
    if(sections['By application'].lines.length) {
        const supportGroups = resolutions.reduce((supportGroups, resolution) => {
            if(supportGroups[resolution['support group']]) {
                supportGroups[resolution['support group']].add(resolution['By application'])
            } else {
                supportGroups[resolution['support group']] = new Set([resolution['By application']]);
            }

            return supportGroups;
        }, {});

        for(let supportGroup in supportGroups) {
            supportGroups[supportGroup] = Array.from(supportGroups[supportGroup]);
        }

        sections['By support group'] = {
            name: 'By support group',
            lines: Object.keys(supportGroups).sort().map(supportGroup => {
                const supportGroupData = data['support group'][supportGroup];
                const applications = supportGroups[supportGroup].sort().map(application => {
                    const applicationData = data['By application'][application];

                    return {
                        ...applicationData,
                        percentage: ((applicationData.value / supportGroupData.value) * 100).toFixed(1)
                    };
                });

                return {
                    ...supportGroupData,
                    lines: applications
                };
            })
        }
    }

    delete sections['support group'];
}

function setByClassification(data, sections, resolutions) {
    const classifications = resolutions.reduce((classifications, resolution) => {
        const classification = resolution['classification'];
        const tier5 = resolution['Tier 5'];

        if(!classifications[classification]) {
            classifications[classification] = {};
        }

        classifications[classification][tier5] = (classifications[classification][tier5] || 0) + 1;

        return classifications;
    }, {});
    
    sections['By classification'] = {
        name: 'By classification',
        lines: Object.keys(classifications).sort().map(classification => {
            const classificationData = data['classification'][classification];
            const tiers5 = Object.keys(classifications[classification]).sort().map(tier5 => {
                const value = classifications[classification][tier5];

                return {
                    label: tier5,
                    value,
                    percentage: ((value / classificationData.value) * 100).toFixed(1)
                };
            });

            return {
                ...classificationData,
                lines: tiers5
            };
        })
    }

    delete sections['classification'];
}

function setSectionsOrder(sections) {
    const sectionsOrder = [
        'By assignee',
        'By type',
        'By priority',
        'By country',
        'By support group',
        'By application',
        'By classification',
        'PBI / KBA',
        'Tier 1',
        'Tier 2',
        'Tier 3',
        'Tier 4',
        'Tier 5',
        'Diagnosis matches the problem',
        'Reopening',
        'Used SQL',
        'SLA',
        'Breach reason'
    ];

    return sectionsOrder.reduce((orderedSections, section) => {
        if(sections[section]) orderedSections.push(sections[section]);
        return orderedSections;
    }, []);
}

exports.getOverview = getOverview;