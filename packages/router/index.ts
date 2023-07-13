import { nonNullish } from 'utils/nonNullish';
import { match } from 'path-to-regexp';
import { SchemaMethod } from 'types/back/method';
import { SchemaParams } from 'types/back/params';
import type { RouterRoutes } from 'types/back/routerRoutes';

export class Router { 
    public static routes: RouterRoutes = {};
    public static paths: string[] = [];

    constructor(definedRoutes: RouterRoutes) {
        Router.setRoutes(definedRoutes);
        Router.setPaths(definedRoutes);
    }

    public static showInfoRequest(request: Request) {
        const url = new URL(request.url);
        // eslint-disable-next-line no-console
        console.log(`${request.method}: ${url.pathname}`, );
    }
    
    public static getRefAndParamByURL(request: Request) {
        let routeRef: string | undefined;
        let params: Record<string, never> | undefined;
        const url = new URL(request.url);
        Router.paths.every((path) => {
            const matcherUrl = match(path)(url.pathname);
            if (!matcherUrl) return true;
            const paramsParsed = SchemaParams.parse(matcherUrl.params);
            params = paramsParsed;
            routeRef = path;
            return false;
        });

        if (!nonNullish(routeRef)) {
            throw new Error(`The url passed dosnt exist`);
        }

        return { routeRef, params };
    }

    public handleRequest(request: Request) {
        Router.showInfoRequest(request);
        const { routeRef, params } = Router.getRefAndParamByURL(request);
        const method = Router.getMethod(request, routeRef);
        return method(request, params);
    }

    public static setPaths(definedRoutes: RouterRoutes) {
        Router.paths = Object.keys(definedRoutes);
    }

    
    public static getMethod(request: Request, routeRef: string) {
        if (!nonNullish(Router.routes)) {
            throw new Error('Fatal error: Routes not defined');
        }

        const methods = Router.routes[routeRef];

        if (!nonNullish(methods)) {
            throw new Error(`Fatal error: Route reference: "${routeRef}" not found`);
        }

        const { method } = request;
        const methodParsed = SchemaMethod.parse(method);
        if (!nonNullish(methodParsed)) {
            throw new Error(`Router method "${methodParsed}" is not valid`);
        }
        const methodAction = methods[methodParsed];
        if (!nonNullish(methodAction)) {
            throw new Error(`Router method "${method}" not found in Router url "${request.url}"`);
        }

        return methodAction;

    }

    public static setRoutes(definedRoutes: RouterRoutes) {
        Router.routes = Object.freeze(definedRoutes);
    }

    public static getRoutes() {
        return Router.routes;
    }
}