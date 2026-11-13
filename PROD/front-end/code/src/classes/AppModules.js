class Route {
    constructor(route, prevPath) {
        this.name = route.name;
        this.icon = route.icon;
        this.description = route.description || {};
        this.relativePath = route.relativePath;
        this.path = `${prevPath}/${this.relativePath}`;
        this.routes = [];
        this.allowedTo = route.allowedTo;
        this.notAllowedTo = route.notAllowedTo;
        this.accessRequired = route.accessRequired;
        this.userHaveAccess = route.userHaveAccess? route.userHaveAccess : () => true;

        this.label = typeof route.label === 'string'
            ? {en: route.label, es: route.label, pt: route.label}
            : route.label || {};

        if(route.routes) {
            route.routes.forEach(nestedRoute => this.routes.push(new Route(nestedRoute, this.path)));
        }
    }

    getProps(lang) {
        return {
            name: this.name,
            path: this.path,
            relativePath: this.relativePath,
            icon: this.icon,
            label: this.label[lang],
            description: this.description[lang]
        };
    }
}

class Module {
    constructor(module) {
        this.name = module.name || '';
        this.path = module.path || '';
        this.isTool = module.isTool || false;
        this.defaultAccess = module.defaultAccess || false;
        // this.accessAllowedTo = module.accessAllowedTo || [];
        this.relativePath = module.relativePath || '';
        this.icon = module.icon || ''
        this.label = typeof module.label === 'string'
            ? {en: module.label, es: module.label, pt: module.label}
            : module.label || {};
        this.description = module.description || {}
        this.submodules = [];
        this.routes = [];
        this.parent = module.parent;
        this.userHaveAccess = module.userHaveAccess? module.userHaveAccess : () => true;

        if(!this.parent && module.submodules) {
            module.submodules.forEach(submodule => this.addSubmodule(submodule));
        }

        if(module.routes) {
            this.addRoutes(module.routes);
        }
    }

    addSubmodule(submodule) {
        submodule.path = `${this.path}/${submodule.relativePath}`;
        submodule.parent = this;

        if(!submodule.userHaveAccess) {
            submodule.userHaveAccess = this.userHaveAccess;
        }

        const newSubmodule = new Module(submodule);
        this.submodules.push(newSubmodule);
    }

    addRoutes(routes) {
        const newRoutes = routes.map(route => new Route(route, this.path));
        this.routes.push(...newRoutes);
    }

    // addRoutes(routes) {
    //     const createPath = (route, prevPath = this.path) => {
    //         route.path = `${prevPath}/${route.relativePath}`;
    //         route.label = typeof route.label === 'string'
    //         ? {en: route.label, es: route.label, pt: route.label}
    //         : route.label || {};
    
    //         if(route.routes) {
    //             route.routes.forEach(nestedRoute => createPath(nestedRoute, route.path));
    //         }

    //         return route;
    //     }
        
    //     routes.forEach(route => createPath(route));

    //     this.routes.push(...routes);
    // }

    getRoute(...routeNames) {
        let route = null;
        let routes = this.routes;

        for(let name of routeNames) {
            route = routes.find(route => route.name === name);

            if(!route) return route;

            routes = route.routes || [];
        }

        return route;        
    }

    getPath(...routeNames) {
        return this.getRoute(...routeNames).path;
    }

    getRelativePath(...routeNames) {
        return this.getRoute(...routeNames).relativePath;
    }

    getSubmodule(submoduleName) {
        return this.submodules.find(submodule => submodule.name === submoduleName);
    }

    getSubmoduleByPath(submodulePath) {
        return this.submodules.find(submodule => submodule.path === submodulePath);
    }

    // getSubmoduleByName(...submoduleNames) {
    //     if(!submoduleNames.length) return null;

    //     let submodule = this;

    //     submoduleNames.forEach(name => {
    //         submodule = submodule.submodules.find(submodule => submodule.name === name);
    //     });

    //     return submodule;
    // }

    // getSubmoduleByPath(...submoduleRelativePaths) {
    //     if(!submoduleRelativePaths.length) return null;

    //     let submodule = this;

    //     submoduleRelativePaths.forEach(relativePath => {
    //         let searchResult = submodule.submodules.find(submodule => submodule.relativePath === relativePath);

    //         if(!searchResult) {
    //             submodule = submodule.submodules.find(submodule => submodule.relativePath.startsWith(':'));
    //             if(!submodule) return;
    //         } else {
    //             submodule = searchResult;
    //         }
    //     });

    //     return submodule;
    // }

    // getRoot() {
    //     let root = this.parent || this;

    //     while(root && root.parent) {
    //         root = root.parent;
    //     }

    //     return root;
    // }

    getProps(lang) {
        return {
            name: this.name,
            path: this.path,
            relativePath: this.relativePath,
            icon: this.icon,
            label: this.label[lang],
            description: this.description[lang]
        };
    }
}

class AppModules {
    constructor(modules = []) {
        this.modules = modules.map(module => new Module(module));
    }

    // add(module, parentModule) {
    //     const newModule = new Module(module);
    //     if(parentModule) {
    //         newModule.parentModule = parentModule;
    //     } else {
    //         newModule.isRoot = true;
    //         this.modules.push(newModule);
    //     }

    //     if(module.submodules) {
    //         module.submodules.forEach(submodule => {
    //             submodule.path = `${newModule.path}/${submodule.relativePath}`;
    //             const newSubmodule = this.add(submodule, newModule);
    //             newModule.addSubmodule(newSubmodule);
    //         });
    //     }

    //     return newModule;
    // }

    add(module) {
        const newModule = new Module(module);
        this.modules.push(newModule);
        return newModule;
    }

    get(...modulesNames) {
        if(!modulesNames.length) return this.modules;
        if(modulesNames[0].startsWith('/')) return this.getByPath(modulesNames[0]);
        else return this.getByName(...modulesNames);
    }

    getByName(moduleName, submoduleName) {
        const module = this.modules.find(module => module.name === moduleName);

        if(module && submoduleName) {
            return module.getSubmodule(submoduleName);
        } else {
            return module;
        }
    }

    getByPath(path) {
        const relativePaths = path.replace('/', '').split('/');
        const module = this.modules.find(module => module.relativePath === relativePaths[0]);
        
        if(!module) return null;
        
        if(relativePaths[1]) {
            const submodule = module.submodules.find(submodule => submodule.relativePath === relativePaths[1]);
            return submodule || module;
        } else {
            return module;
        }
    }
}

export default AppModules;