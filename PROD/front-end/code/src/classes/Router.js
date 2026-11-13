class Route {
    constructor(route) {
        this.name = route.name || '';
        this.path = route.path || '';
        this.relativePath = route.relativePath || '';
        this.nestedRoutes = [];
    }

    addNestedRoute(route) {
        this.nestedRoutes.push(route);
    }

    getNestedRoute(...nestedRouteNames) {
        if(!nestedRouteNames.length) return null;

        let route = this;

        nestedRouteNames.forEach(name => {
            route = route.nestedRoutes.find(nestedRoute => nestedRoute.name === name);
        });

        return route;
    }

    getPath(...routeNames) {
        const route = this.getNestedRoute(...routeNames);
        return route && route.path;
    }

    getRelativePath(...routeNames) {
        const route = this.getNestedRoute(...routeNames);
        return route && route.relativePath;
    }
}

class Router {
    constructor(routes = []) {
        this.routes = routes.map(route => new Route(route));
    }

    getRoute(...routeNames) {
        const root = routeNames.shift();
        const rootRoute = this.routes.find(route => route.name === root);

        if(!routeNames.length) return rootRoute;
        
        return rootRoute.getNestedRoute(...routeNames);
    }

    addRoute(route, nested = false) {
        const newRoute = new Route(route);
        if(!nested) this.routes.push(newRoute);

        if(route.nestedRoutes) {
            route.nestedRoutes.forEach(nestedRoute => {
                const newNestedRoute = this.addRoute(nestedRoute, true);
                newNestedRoute.path = `/${newRoute.relativePath}/${newNestedRoute.relativePath}`;
                newRoute.addNestedRoute(newNestedRoute);
            });
        }

        return newRoute;
    }

    addNestedRoute(routePath, nestedRoutePath){
        const route = this.getRoute(routePath);
        const nestedRoute = this.getRoute(nestedRoutePath);
        route.addNestedRoute(nestedRoute);
    }

    path(...routeNames) {
        const route = this.getRoute(...routeNames);
        return route && route.path;
    }

    relativePath(...routeNames) {
        const route = this.getRoute(...routeNames);
        return route && route.relativePath;
    }
}

export default Router;