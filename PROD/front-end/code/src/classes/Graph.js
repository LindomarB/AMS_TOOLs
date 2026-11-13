/*
VERTEX STRUCTURE:
vertex = {
    name: "VERTEX NAME",
    connectionsFrom: ["VERTEX A", "VERTEX B", ...],
    connectionsTo: [
        {
            destination: "VERTEX C",
            rules: [
                {1: "VERTEX A", 2: "VERTEX B"},
                {1: "VERTEX D", 2: "VERTEX E", 4: "VERTEX F"},
                {1: "VERTEX X", 2: "VERTEX Y", 3: "VERTEX Z"}
            ]
        },
        {
            destination: "VERTEX W",
            rules: {3: "VERTEX K"}
        },
        {
            destination: "VERTEX P",
            rules: []
        }
    ]
}
*/

class Graph {
    constructor(vertices = []) {
        this.adjacentList = {};

        vertices.forEach(vertex => this.addVertex(vertex));
    }

    addVertex(vertex) {
        if(this._checkVertex(vertex, false)) {
            console.warn(`Vertex ${vertex} already exists`);
            return false;
        }

        //connectionsFrom has the vertices names that have connections towards the vertex
        //connectionsTo has the vertex connections towards another vertices
        //Connection object: 
        // {
        //     destination: "the name of destination vertex",
        //     rules: [{depth: vertex, depth: vertex, ...}, ...]
        // }
        //A rule is an object where the keys are the numbers that indicates the connection depth
        //and the value are the vertex name at the depth. A connection is only active when one of its rules is valid
        //The depth represent the previous vertices in the connection and always starting in 1 (the direct previous vertex)
        //Example:
        //Path ["A", "B", "C", "D", "E"]
        //"E" depth 1 = "D"; "E" depth 2 = "D"; "E" depth 4 = "A"; "E" depth 6 = null;
        //"C" depth 1 = "B"; "C" depth 2 = "A"; "C" depth 4 = null;

        const newVertex = {
            name: vertex,
            connectionsFrom: [],
            connectionsTo: []
        };

        this.adjacentList[vertex] = newVertex;

        return this.adjacentList[vertex]
    }

    //Checks if a vertex exists
    _checkVertex(vertex, showWarning = true) {
        if(!vertex) return false;
        
        if(!this.adjacentList[vertex]) {
            if(showWarning) {
                console.warn(`Vertex ${vertex} do not exists`);
            }
            return false;
        }

        return true;
    }

    getVertex(vertex, check = true) {
        if(check) {
            if(!this._checkVertex(vertex)) return false;
        }
        return this.adjacentList[vertex];
    }

    getVertices() {
        const verticesName = Object.keys(this.adjacentList).sort();
        const vertices = {};
        verticesName.forEach(vertexName => vertices[vertexName] = this.adjacentList[vertexName]);
        return vertices;
    }

    //Adds connections to a vertex towards vertices that share the same rules
    addConnections(origin, destinations, rules) {
        destinations.forEach(destination => this.addConnection(origin, destination, rules));
    }

    //Adds a connection to a vertex towards another
    //If the connection already exists, it will try to add the new rule
    //PARAMETERS
    //origin: a string (the vertex name)
    //destination: a string (the vertex name)
    //rules: an array with single or grouped rules
    addConnection(origin, destination, rules = [], options = {}) {
        if(origin === destination) {
            console.warn(`A vertex can't be connected to itself (attempt to connect ${origin} with ${destination}`);
            return false;
        }

        const originVertex = this.getVertex(origin);
        if(!originVertex) return false;

        const destinationVertex = this.getVertex(destination);
        if(!destinationVertex) return false;

        const createConnection = () => {
            const newConnection = {
                destination,
                rules: []
            };

            const addRulesProcess = this.addRules(origin, destination, rules, false, newConnection, options);

            if(addRulesProcess.complete) {
                originVertex.connectionsTo.push(newConnection);
                destinationVertex.connectionsFrom.push(origin);
            }

            return addRulesProcess;
        }

        const connection = this.getVertexConnections(origin, "to", destination, null, false)[0];
        if(!connection) return createConnection();

        if(!rules.length) {
            if(connection.rules.length) {
                console.warn(`Vertex ${origin} has rules to connect with ${destination}. A new connection without rules is not allowed.`);
            } else {
                console.warn(`The vertex ${origin} is already connected with ${destination} without rules.`);
            }
            return false;
        }

        const addRulesProcess = this.addRules(origin, destination, rules, false, connection, options);        
        return addRulesProcess;
    }

    getVertexConnections(originName, direction, destinationName = null, rule, vertexValidation = true) {
        const origin = this.getVertex(originName, vertexValidation);
        if(vertexValidation) {
            if(!origin) return [];
        }

        const destinationIsArray = destinationName && typeof destinationName === "object" && destinationName.length;

        if(destinationIsArray) {
            const vertexConnections = destinationName.map(destination => {
                const connection = this.getVertexConnections(originName, direction, destination, rule, false);
                return {
                    destination,
                    connection: connection[0]
                };
            });
    
            return vertexConnections;
        }

        const destination = destinationName === null? null : this.getVertex(destinationName, vertexValidation);

        if(vertexValidation && destination !== null) {
            if(!destination) return [];
        }

        const getConnectionsFrom = () => {
            return origin.connectionsFrom.reduce((connections, vertexName) => {
                if(!destination || destination.name === vertexName) {
                    const vertex = this.getVertex(vertexName, false);

                    vertex.connectionsTo.forEach(connection => {
                        if(connection.destination === origin.name) {
                            connections.push(connection);
                        }
                    });
                }
                
                return connections;
            }, []);
        }

        const getConnectionsTo = () => {
            return destination
                ? origin.connectionsTo.filter(connection => connection.destination === destination.name)
                : origin.connectionsTo;
        }

        const getValidConnections = (connections) => {
            return connections.filter(connection => this.connectionIsValid(connection, rule));
        }        

        if(direction) {
            const vertexConnections = (direction === "from")? getConnectionsFrom() : getConnectionsTo(); //OUTPUT: [{connection}, ...] || []

            if(vertexConnections.length && rule) {
                return getValidConnections(vertexConnections);
            }

            return vertexConnections;
        } else {
            const vertexConnections = { //OUTPUT: {from: [{connection}, ...], to: [{connection}, ...]}
                from: getConnectionsFrom(),
                to: getConnectionsTo()
            }; 
            
            if((vertexConnections.from.length || vertexConnections.to.length) && rule) {
                vertexConnections.from = getValidConnections(vertexConnections.from);
                vertexConnections.to = getValidConnections(vertexConnections.to);
            }
            console.log(vertexConnections)
            return vertexConnections;
        }
    }
    
    //Checks if a connection is valid using a single or grouped rule
    connectionIsValid(connection, rule) {
        if(!connection.rules.length) {
            return true;
        }

        const ruleMatches = (connectionRule) => {
            const givenRules = this.extractSingleRules(rule);

            return givenRules.some(givenRule => {
                for(let depth in connectionRule) {
                    if(!givenRule[depth]) return false;
                    if(connectionRule[depth] !== givenRule[depth]) return false;
                }
    
                return true;
            });
        }
        
        return connection.rules.some(connectionRule => ruleMatches(connectionRule));
    }

    //Return all the single rules in a grouped rule
    extractSingleRules(rule) {
        //Checks if the depth value is a string or an array
        //If the value is a string, puts into an array to avoid multiple checks during the code
        const checkDepthVertices = (vertices) => {
            return (typeof vertices === "string")? [vertices] : vertices;
        }

        let singleRules = []
        
        if (!Object.keys(rule).length) return singleRules;
        
        for(let depth in rule) {
            const depthVertices = checkDepthVertices(rule[depth]);

            if(!singleRules.length) {
                depthVertices.forEach(vertex => singleRules.push({[depth]: vertex}));
            } else {
                const newFlatRules = [];
                singleRules.forEach(singleRule => {
                    depthVertices.forEach(vertex =>
                        newFlatRules.push({...singleRule, [depth]: vertex})
                    );
                });

                singleRules = newFlatRules;
            }
        }

        return singleRules;
    }

    addRules(originName, destinationName, newRules, vertexValidation = true, connection = null, options = {}) {
        const origin = this.getVertex(originName);
        const destination = this.getVertex(destinationName);

        if(vertexValidation) {
            if(!origin) return 0;
            if(!destination) return 0;
        }

        const process = {
            complete: false,
            steps: {
                newRulesValidation: {
                    done: false,
                    passed: false,
                    result: null
                },
                duplicatedCheck: {
                    done: false,
                    passed: false,
                    result: null
                },
                depthCheck: {
                    done: false,
                    passed: false,
                    result: null
                },
                specificityCheck: {
                    done: false,
                    passed: false,
                    result: null
                }
            },
            data: null,
            options: structuredClone(options),
            origin,
            destination,
            connection
        };

        if(!options.ignoreNewRules) {
            options.ignoreNewRules = {};
        }

        if(!options.specificityConflict) {
            options.specificityConflict = {};
        }

        const validateNewRules = (newRules) => {
            const checkedRules = newRules.map(newRule => ({
                rule: newRule,
                duplicated: false,
                lessSpecific: false,
                moreSpecific: false
            }));

            const result = {
                duplicated: false,
                specificityConflict: false,
                checkedRules
            };

            const rulesToCompare = structuredClone(newRules);

            for(let idx = rulesToCompare.length - 1; idx > 0; idx--) {
                //Take a rule to compare with the others in the same array
                //Remove the compared rule from array to avoid coparison with itself
                rulesToCompare.pop();
                const checkedRule = checkedRules[idx];

                const duplicatedRule = ruleIsDuplicated(checkedRule.rule, rulesToCompare);

                if(duplicatedRule) {
                    checkedRule.duplicated = true;
                    result.duplicated = true;
                }

                rulesToCompare.forEach((ruleToCompare, idx) => {
                    const specificityConflict = ruleHasSpecificityConflict(checkedRule.rule, ruleToCompare);

                    if(specificityConflict) {
                        if(specificityConflict.ruleA.lessSpecific) {
                            checkedRule.lessSpecific = true;
                            checkedRules[idx].moreSpecific = true;
                        } else {
                            checkedRule.moreSpecific = true;
                            checkedRules[idx].lessSpecific = true;
                        }
                        result.specificityConflict = true;
                    }
                });
            }

            return result;
        }

        const ruleIsDuplicated = (rule, rulesToCompare) => {
            const duplicatedRule = rulesToCompare.some(ruleToCompare => {
                const ruleToCompareDepths = Object.keys(ruleToCompare).length;
                const ruleDepths = Object.keys(rule).length;

                //Only rules with same length can be duplicated
                if(ruleToCompareDepths === ruleDepths) {
                    if(this.connectionIsValid({...connection, rules: [ruleToCompare]}, rule)) {
                        console.warn(`The rule ${JSON.stringify(rule)} is already inside the rule ${JSON.stringify(ruleToCompare)}`);
                        console.log('ORIGIN: ', originName)
                        console.log('DESTINY: ', destinationName)
                        return true;
                    }
                }

                return false;
            });

            if(duplicatedRule) {
                return duplicatedRule;
            } else {
                return false;
            }
        }

        const checkDuplicatedRules = (newRules) => {
            const result = {
                duplicated: [],
                single: []
            };

            newRules.forEach(newRule => {
                const duplicatedRule = ruleIsDuplicated(newRule, connection.rules);
                if(duplicatedRule) {
                    result.duplicated.push({newRule, duplicatedRule});
                } else {
                    result.single.push(newRule);
                }
            });

            return result;
        }  

        const checkDepth = (newRules) => {
            const result = {
                fitDepth: [],
                outOfDepth: [],
                vertexNotConnected: []
            };

            const originDepths = this.getDepths(originName).depths;

            newRules.forEach(newRule => {
                for(let depth in newRule) {
                    //The origin vertex must have the new rule depth
                    if(!originDepths[depth]) {
                        result.outOfDepth.push({rule: newRule, depth});
                        console.warn(`Vertex ${originName} do not have connections at depth ${depth}`);
                        return false;
                    }

                    //The origin vertex must have new rule vertex at the current depth 
                    const vertex = newRule[depth];
                    if(!originDepths[depth][vertex]) {
                        result.vertexNotConnected.push({rule: newRule, depth, vertex});
                        console.warn(`Vertex ${vertex} is not connected to ${originName} at depth ${depth}`);
                        console.warn(`The rule ${JSON.stringify(newRule)} is not valid for vertex ${originName}`);
                        return false;
                    }
                }

                result.fitDepth.push(newRule);
                return true;
            });

            return result;
        }

        const ruleHasSpecificityConflict = (ruleA, ruleB) => {
            const hasConflict = (shortestRule, longestRule) => {
                //If the for loop concludes, the connections have conflict
                for(let depth in shortestRule) {
                    //If the shortest rule do not have any vertex at the same depth of the longest rule, is the same it that has all the vertices
                    //Rules with different vertex at same depth can't have specificity conflict
                    if(longestRule[depth] && (shortestRule[depth] !== longestRule[depth])) return false;
                }
                return true;
            }

            const ruleALength = Object.keys(ruleA).length;
            const ruleBLength = Object.keys(ruleB).length;

            //Only rules with different lengths can have specificity conflict
            if(ruleALength === ruleBLength) return false;

            if(ruleALength > ruleBLength) {
                if(hasConflict(ruleB, ruleA)) {
                    console.warn(`${originName} => ${destinationName}: Rule ${JSON.stringify(ruleA)} is more specific than ${JSON.stringify(ruleB)}`);
                    return {
                        ruleA: {
                            rule: ruleA,
                            moreSpecific: true,
                            lessSpecific: false
                        },
                        ruleB: {
                            rule: ruleB,
                            moreSpecific: false,
                            lessSpecific: true
                        }
                    };
                }
            } else {
                if(hasConflict(ruleA, ruleB)) {
                    console.warn(`Rule ${JSON.stringify(ruleA)} is less specific than ${JSON.stringify(ruleB)}`);
                    return {
                        ruleA: {
                            rule: ruleA,
                            moreSpecific: false,
                            lessSpecific: true
                        },
                        ruleB: {
                            rule: ruleB,
                            moreSpecific: true,
                            lessSpecific: false
                        }
                    };
                }
            }

            return false;
        }

        const checkSpecificityConflicts = (newRules) => {
            const result = {
                newRuleMoreSpecific: [],
                newRuleLessSpecific: [],
                noConflict: []
            };

            const checkConflicts = (newRule) => {
                connection.rules.forEach((connectionRule, connectionRuleIndex) => {
                    const conflict = ruleHasSpecificityConflict(newRule, connectionRule);

                    if(conflict) {
                        if(conflict.ruleA.lessSpecific) {
                            result.newRuleLessSpecific.push({newRule, connectionRule, connectionRuleIndex});
                        } else {
                            result.newRuleMoreSpecific.push({newRule, connectionRule, connectionRuleIndex});
                        }
                    } else {
                        result.noConflict.push(newRule);
                    }
                });
            }

            newRules.forEach(newRule => checkConflicts(newRule, connection.rules));
            return result;
        }

        const addNewRulesToConnection = (newRules) => {
            connection.rules.push(...newRules);
        }

        if(!connection) {
            connection = this.getVertexConnections(originName, "to", destinationName, null, false);
        }

        process.data = [];
        newRules.forEach(newRule => process.data.push(...this.extractSingleRules(newRule)));
        
        //NEW RULES VALIDATION
        process.steps.newRulesValidation.result = validateNewRules(process.data);
        process.steps.newRulesValidation.done = true;
        
        if(process.steps.newRulesValidation.result.duplicated || process.steps.newRulesValidation.result.specificityConflict) {
            if(!options.ignoreNewRules.invalidRules) {
                process.steps.newRulesValidation.passed = false;
                return process;
            }

            const data = [];

            process.steps.newRulesValidation.result.checkedRules.forEach(checkedRule => {
                if(checkedRule.duplicated) return;
                if(checkedRule.lessSpecific) return;
                data.push(checkedRule.rule);
            });

            process.data = data;
        }

        //CONNECTION RULES CHECK
        if(!connection.rules.length) {
            addNewRulesToConnection(process.data);
            process.complete = true;
            return process;
        }

        //NEW RULES DUPLICATED CHECK
        process.steps.duplicatedCheck.result = checkDuplicatedRules(process.data);
        process.steps.duplicatedCheck.done = true;

        if(process.steps.duplicatedCheck.result.duplicated.length) {
            if(!options.ignoreNewRules.duplicated) {
                process.steps.duplicatedCheck.passed = false;
                return process;
            }
        }

        process.steps.duplicatedCheck.passed = true;
        process.data = process.steps.duplicatedCheck.result.single;
        
        //NEW RULES DEPTH CHECK
        process.steps.depthCheck.result = checkDepth(process.data);
        process.steps.depthCheck.done = true;

        if(process.steps.depthCheck.result.outOfDepth.length) {
            if(!options.ignoreNewRules.outOfDepth) {
                process.steps.depthCheck.passed = false;
                return process;
            }
        }

        if(process.steps.depthCheck.result.vertexNotConnected.length) {
            if(!options.ignoreNewRules.vertexNotConnected) {
                process.steps.depthCheck.passed = false;
                return process;
            }
        }

        process.steps.depthCheck.passed = true;
        process.data = process.steps.depthCheck.result.fitDepth;

        //NEW RULES SPECIFICITY CHECK
        process.steps.specificityCheck.result = checkSpecificityConflicts(process.data);
        process.steps.specificityCheck.done = true;

        if(process.steps.specificityCheck.result.newRuleMoreSpecific.length) {
            if(!options.ignoreNewRules.moreSpecificConflicts) {
                process.steps.specificityCheck.passed = false;
                return process;
            }
        }

        if(process.steps.specificityCheck.result.newRuleLessSpecific.length) {
            if(!options.ignoreNewRules.lessSpecificConflicts) {
                process.steps.specificityCheck.passed = false;
                return process;
            }
        }

        if(options.specificityConflict.replaceLessSpecificConnectionRules) {
            process.steps.specificityCheck.result.newRuleMoreSpecific.forEach(newRuleMoreSpecific => {
                connection.rules[newRuleMoreSpecific.connectionRuleIndex] = newRuleMoreSpecific.newRule;
            });
        }

        if(options.specificityConflict.replaceMoreSpecificConnectionRules) {
            process.steps.specificityCheck.result.newRuleLessSpecific.forEach(newRuleLessSpecific => {
                connection.rules[newRuleLessSpecific.connectionRuleIndex] = newRuleLessSpecific.newRule;
            });
        }

        process.steps.specificityCheck.passed = true;
        process.data = process.steps.specificityCheck.result.noConflict;

        addNewRulesToConnection(process.data);
        process.complete = true;

        return process;
    }

    getDepths(originName, startDepth = 1) {
        const origin = this.getVertex(originName);
        const depths = {};
        let possiblePaths = [];

        if(!origin) return {depths, possiblePaths};

        let currentDepth = startDepth;
        let nextDepth = startDepth + 1;

        if(origin.connectionsFrom.length) {
            depths[currentDepth] = {};

            origin.connectionsFrom.forEach(vertex => {
                depths[currentDepth][vertex] = true;
                possiblePaths.push([origin.name, vertex]);
            });
        }

        while(depths[currentDepth]) {
            const newPaths = [];
            let remainingPaths = [...possiblePaths];

            for(let vertexName in depths[currentDepth]) {
                const vertex = this.getVertex(vertexName);

                if(!vertex.connectionsFrom.length) continue;

                const pathsThatEndsWithVertex = [];

                remainingPaths = remainingPaths.filter(path => {
                    if(path[path.length - 1] === vertex.name) {
                        pathsThatEndsWithVertex.push(path);
                        return false;
                    } else {
                        return true;
                    }
                });

                vertex.connectionsFrom.forEach(connectionFormVertex => {
                    pathsThatEndsWithVertex.forEach(path => {
                        //A path can't have the same vertex twice
                        if(!path.includes(connectionFormVertex)) {
                            newPaths.push([...path, connectionFormVertex]);

                            if(!depths[nextDepth]){
                                depths[nextDepth] = {};
                            }

                            depths[nextDepth][connectionFormVertex] = true;
                        }
                    });
                });
            }

            possiblePaths = [...newPaths, ...remainingPaths];
            currentDepth++;
            nextDepth++;
        }

        return {depths, possiblePaths};
    }
    
    pathIsValid(path) {
        if(!path.length) return true;

        const prevPath = [path[0]];

        for(let i = 1; i < path.length; i++) {
            const nextVertex = path[i];
            const destinations = this.getDestinations(prevPath);

            if(!destinations.includes(nextVertex)) return false;

            prevPath.push(nextVertex);
        }

        return true;
    }

    getDestinations(path) {
        if(!path || !path.length) return [];

        path = [...path];
        const origin = this.getVertex(path.pop());

        if(!origin) return [];

        let depthCounter = 1;
        const rule = path.reduceRight((obj, vertex) => {
            obj[depthCounter] = vertex;
            depthCounter++;
            return obj;
        }, {});

        const destinations = [];
        origin.connectionsTo.forEach(connection => {
            if(this.connectionIsValid(connection, rule)) {
                destinations.push(connection.destination);
            }
        });

        return destinations;
    }

    getPaths(vertexName = null, limit) {
        const getPreviousPaths = (originName) => {
            const possiblePrevPaths = this.getDepths(originName).possiblePaths;
            
            possiblePrevPaths.forEach(path => path.reverse());
    
            const previousPaths = possiblePrevPaths.filter(prevPath => this.pathIsValid(prevPath));
    
            return previousPaths;
        }

        const getNextPaths = (prevPaths, limit) => {
            const completePaths = [];
            let parcialPaths = [...prevPaths];

            while(parcialPaths.length) {
                if(limit && parcialPaths[0].length === limit) return parcialPaths;

                const newParcialPaths = [];

                parcialPaths.forEach(parcialPath => {
                    const destinations = this.getDestinations(parcialPath);

                    if(destinations.length) {
                        destinations.forEach(destination => newParcialPaths.push([...parcialPath, destination]));
                    } else {
                        completePaths.push(parcialPath);
                    }
                });

                parcialPaths = newParcialPaths;
            }

            return completePaths;
        }

        const getAllPaths = (limit) => {
            const paths = [];
            const origins = this.getOrigins();
            origins.forEach(origin => {
                const originPaths = getNextPaths([[origin]], limit);
                paths.push(...originPaths);
            });

            return paths;
        }

        if(!vertexName) {
            return getAllPaths(limit);
        }

        const prevPaths = getPreviousPaths(vertexName);
        const paths = getNextPaths(prevPaths);
        return paths;
    }

    getOrigins() {
        const origins = [];

        for(let vertex in this.adjacentList) {
            if(this.adjacentList[vertex].connectionsFrom.length === 0) {
                origins.push(vertex);
            }
        }

        return origins.sort();
    }

    printPathsOnConsole(paths) {
        paths.forEach(path => {
            console.log(path.join(" => "));
        });
    }

    groupRules(rules) {
        const getTail = (rule, currentDepth) => {
            const tail = {};

            for(let depth in rule) {
                if(depth > currentDepth) {
                    tail[depth] = rule[depth];
                }
            }

            return tail;
        }

        const tailsAreEqual = (tailA, tailB) => {
            for(let depth in tailA) {
                if(tailA[depth] !== tailB[depth]) return false;
            }

            return true;
        }

        const getRuleMaxDepth = (rule) => {
            const depths = Object.keys(rule);
            let maxDepth = 0;
            depths.forEach(depth => maxDepth = Math.max(depth, maxDepth));
            return maxDepth;
        }

        const getHead = (rule, maxDepth) => {
            const head = {};

            for(let depth in rule) {
                if(depth < maxDepth) {
                    head[depth] = rule[depth];
                }
            }

            return head;
        }

        const headsAreEqual = (headA, headB) => {
            const headALength = Object.keys(headA).length;
            const headBLength = Object.keys(headB).length;

            if(headALength !== headBLength) return false;

            for(let depth in headA) {
                if(!headB[depth]) return false;
                if(!headA[depth].every(vertex => headB[depth].includes(vertex))) return false;
            }

            return true;
        }

        let rulesToCompareTails = structuredClone(rules);
        let tailComparisonComplete = [];
        let depth = 1;

        while(rulesToCompareTails.length) {
            const newRulesToCompareTails = [];
    
            rulesToCompareTails.forEach((rule, index, array) => {
                if(!rule) return;

                const tail = getTail(rule, depth);
                let foundEqualTail = false;
                rule[depth] = [rule[depth]];

                if(!Object.keys(tail).length) {
                    tailComparisonComplete.push(rule);
                    return;
                };

                for(let ruleIndex = index + 1; ruleIndex < array.length; ruleIndex++) {
                    const nextRule = array[ruleIndex];
                    const nextRuleTail = getTail(nextRule, depth);

                    if(tailsAreEqual(tail, nextRuleTail)) {
                        rule[depth].push(nextRule[depth]);
                        array[ruleIndex] = null;
                        foundEqualTail = true;
                    } 
                }

                if(foundEqualTail) {
                    newRulesToCompareTails.push(rule);
                } else {
                    //Put all depth vertices in arrays
                    for(let depth in rule) {
                        if(typeof rule[depth] === "string") {
                            rule[depth] = [rule[depth]];
                        }
                    }
                    
                    tailComparisonComplete.push(rule);
                }
            });
    
            rulesToCompareTails = newRulesToCompareTails;
            depth++;
        }

        const headComparisonComplete = [];

        tailComparisonComplete.forEach((rule, index, array) => {
            if(!rule) return;

            const maxDepth = getRuleMaxDepth(rule);
            const head = getHead(rule, maxDepth);

            for(let ruleIndex = index + 1; ruleIndex < array.length; ruleIndex++) {
                const nextRule = array[ruleIndex];
                const nextRuleMaxDepth = getRuleMaxDepth(nextRule);

                if(maxDepth === nextRuleMaxDepth) {
                    const nextRuleHead = getHead(nextRule, maxDepth);

                    if(headsAreEqual(head, nextRuleHead)) {
                        rule[maxDepth].push(...nextRule[nextRuleMaxDepth])
                        array[ruleIndex] = null;
                    }
                }
            }

            headComparisonComplete.push(rule);
        });

        return headComparisonComplete;  
    }

    extractConnections(vertexName) {
        const vertex = this.getVertex(vertexName);
        const connections = [];

        if(!vertex) return connections;

        const rulesAreEquals = (rulesA, rulesB) => {
            if(rulesA.length !== rulesB.length) return false;
            
            return rulesA.every(ruleA => {
                return rulesB.some(ruleB => {
                    const ruleALength = Object.keys(ruleA).length;
                    const ruleBLength = Object.keys(ruleB).length;

                    if(ruleALength !== ruleBLength) return false;

                    for(let depth in ruleA) {
                        if(!ruleB[depth]) return false;
                        if(!ruleA[depth].every(vertex => ruleB[depth].includes(vertex))) return false;
                    }

                    return true;
                });
            });
        }

        //Group the rules of each connection
        const vertexConnections = vertex.connectionsTo.map(connectionTo => ({
            origin: vertex.name,
            destinations: [connectionTo.destination],
            rules: this.groupRules(connectionTo.rules)
        }));

        //Group the destinations that have the same rules
        vertexConnections.forEach((vertexConnection, index, array) => {
            if(!vertexConnection) return;

            for(let nextIndex = index + 1; nextIndex < array.length; nextIndex++) {
                const nextVertex = array[nextIndex];

                if(rulesAreEquals(vertexConnection.rules, nextVertex.rules)) {
                    vertexConnection.destinations.push(...nextVertex.destinations);
                    array[nextIndex] = null;
                }
            }

            connections.push(vertexConnection);
        });

        return connections;
    }
}

export default Graph;