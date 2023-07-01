import { MethodContainer } from 'types/back-generics/methodContainer';
import { nonNullish } from 'utils/nonNullish';
import { match } from 'path-to-regexp';
import { Method, SchemaMethod } from 'types/back-generics/method';
import { SchemaParams } from 'types/back-generics/params';
import { OptionalRecord } from 'types/optionalRecord';
import { RouterMethodContainer } from 'types/back-generics/routerMethodContainer';

export const GetRouter = <
    Paths extends string, 
    Routes extends Array<[Paths, MethodContainer[]]>, 
    RouterRoutes extends OptionalRecord<Paths, RouterMethodContainer[]>
    > () => class Router { 
    public static routes: RouterRoutes| undefined = undefined;
    public static definedRoutes: Routes | undefined = undefined;

    constructor(definedRoutes: Routes) {
        Router.setRoutes(definedRoutes);
        Router.setDefinedRoutes(definedRoutes);
    }

    public static showInfoRequest(request: Request) {
        const url = new URL(request.url);
        console.log(`${request.method}: ${url.pathname}`, );
    }
    
    public static getRefAndParamByURL(request: Request) {
        let routeRef: Paths | undefined;
        let params: Record<string, never> | undefined;
        const url = new URL(request.url);
        Router.definedRoutes?.every(([route]) => {
            const matcherUrl = match(route)(url.pathname);
            if(!matcherUrl) return true;
            const paramsParsed = SchemaParams.parse(matcherUrl.params);
            params = paramsParsed;
            routeRef = route;
            return false;
        });

        if(!nonNullish(routeRef)) {
            throw new Error(`The url passed dosnt exist`);
        }

        return {routeRef, params};
    }

    public handleRequest(request: Request) {
        Router.showInfoRequest(request);
        const {routeRef, params} = Router.getRefAndParamByURL(request);
        const method = Router.getMethod(request, routeRef);
        return method(request, params);
    }

    public static setDefinedRoutes(definedRoutes: Routes) {
        Router.definedRoutes = definedRoutes;
    }

    
    public static getMethod(request: Request, routeRef: Paths) {
        if(!nonNullish(Router.routes)) {
            throw new Error('Fatal error: Routes not defined');
        }

        const methods = Router.routes[routeRef];

        if(!nonNullish(methods)) {
            throw new Error(`Fatal error: Route reference: "${routeRef}" not found`);
        }

        const {method} = request;
        const methodParsed = SchemaMethod.parse(method);
        if(!nonNullish(methodParsed)) {
            throw new Error(`Router method "${methodParsed}" is not valid`);
        }
        const methodAction = Router.getMethodFromContainer(methods, methodParsed);
        if(!nonNullish(methodAction)) {
            throw new Error(`Router method "${method}" not found in Router url "${request.url}"`);
        }

        return methodAction;

    }

    public static setRoutes(definedRoutes: Routes) {
        const transformedRoutes = Router.transformRoutes(definedRoutes);
        Router.routes = Object.freeze(transformedRoutes);
    }

    public static transformRoutes(definedRoutes: Routes) {
        const routes: RouterRoutes = Router.getRouterRoutes(definedRoutes)
        return routes;
    }

    public static getRoutes() {
        return Router.routes;
    }

    public static getRouterRoutes(routes: Routes) {
        const routerRoutes: OptionalRecord<Paths, RouterMethodContainer[]> = {}
        routes.forEach(([route, methodContainer]) => {
            routerRoutes[route] = methodContainer;
        }
        );
        return routerRoutes as RouterRoutes;

    }

    public static getMethodFromContainer(controllers: RouterRoutes[Paths], method: Method) {
        const methodContainer = controllers?.find(([methodController]) => methodController === method);
        if(!nonNullish(methodContainer)) {
            throw new Error(`Method ${method} already defined`);
        }
        return methodContainer[1];
        
    }

}