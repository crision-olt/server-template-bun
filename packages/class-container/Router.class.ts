import { Routes } from 'types/back-generics/routes';
import { RouterRoutes } from 'types/back-generics/routerRoutes';
import { RouterMethodContainer } from 'types/back-generics/routerMethodContainer';
import { Route } from 'types/back-generics/route';
import { MethodContainer } from 'types/back-generics/methodContainer';
import { nonNullish } from 'utils/nonNullish';
import { match } from 'path-to-regexp';
import { Method } from 'types/back-generics/method';

export class Router<T extends string> { 
    private routes: Readonly<RouterRoutes<T>> | Readonly<Partial<RouterRoutes<T>>> | undefined = undefined;
    private definedRoutes: Routes<T> | undefined = undefined;

    constructor(definedRoutes: Routes<T>) {
        this.setRoutes(definedRoutes);
        this.setDefinedRoutes(definedRoutes);
    }

    public handleRequest(request: Request) {
        const {routeRef, params} = this.getRefAndParamByURL(request);
        const method = this.getMethod(request, routeRef);
        return method(request, params);
    }

    private setDefinedRoutes(definedRoutes: Routes<T>) {
        this.definedRoutes = definedRoutes;
    }

    private getRefAndParamByURL(request: Request) {
        let routeRef: T | undefined;
        let params: object | undefined;
        this.definedRoutes?.every(([route]) => {
            const matcherUrl = match(route)(request.url);
            if(!matcherUrl) return true;
            params = matcherUrl.params;
            routeRef = route;
            return false;
        });

        if(!nonNullish(routeRef)) {
            throw new Error(`The url passed dosnt exist`);
        }

        return {routeRef, params};
    }
    private getMethod(request: Request, routeRef: T) {
        if(!nonNullish(this.routes)) {
            throw new Error('Fatal error: Routes not defined');
        }

        const methods = this.routes[routeRef];

        if(!nonNullish(methods)) {
            throw new Error(`Fatal error: Route reference: "${routeRef}" not found`);
        }

        const {method} = request;
        const methodAction = methods[method as Method];
        if(!nonNullish(methodAction)) {
            throw new Error(`This method "${method}" not found in this url "${request.url}"`);
        }

        return methodAction;

    }

    private setRoutes(definedRoutes: Routes<T>) {
        const transformedRoutes = this.transformRoutes(definedRoutes);
        this.routes = Object.freeze(transformedRoutes);
    }

    public transformRoutes(definedRoutes: Routes<T>) {
        const routes: Partial<RouterRoutes<T>> = {};
        definedRoutes.forEach(this.getRouterRoutes(routes));
        return routes;
    }

    public getRoutes() {
        return this.routes;
    }

    private getRouterRoutes(routes: Partial<RouterRoutes<T>>) {
        return ([route, controller]: Route<T>) => {
            const controllers: RouterMethodContainer = {};

            controller.forEach(this.getMethodContainer(controllers, route))

            if(routes[route]) {
                throw new Error(`Route ${route} already defined`);
            }

            routes[route] = controllers;
        }
    }

    private getMethodContainer(controllers: RouterMethodContainer, route: string) {
        return ([method, action]:MethodContainer) => {
            if(controllers[method]) {
                throw new Error(`Method ${method} already defined in route ${route}`);
            }

            controllers[method] = action;
        }
    }

}