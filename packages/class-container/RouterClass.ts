import { Routes } from 'types/back-generics/routes';
import { RouterRoutes } from 'types/back-generics/routerRoutes';
import { RouterMethodContainer } from 'types/back-generics/routerMethodContainer';
import { Route } from 'types/back-generics/route';
import { MethodContainer } from 'types/back-generics/methodContainer';
import { nonNullish } from 'utils/nonNullish';
import { ZodSchema, ZodTypeDef } from 'zod';

type SchemaRouterRoutes<T extends string> = ZodSchema<RouterRoutes<T>, ZodTypeDef, Partial<RouterRoutes<T>>>;

class Router<T extends string> { 
    private routes: Readonly<RouterRoutes<T>> | undefined = undefined;
    private schemaRoute: SchemaRouterRoutes<T> | undefined = undefined;

    constructor(definedRoutes: Routes<T>, schemaRoute: SchemaRouterRoutes<T>) {
        this.setRoutes(definedRoutes);
        this.setSchemaRoute(schemaRoute);
    }

    private setSchemaRoute(schemaRoute: SchemaRouterRoutes<T>) {
        this.schemaRoute = schemaRoute;
    }

    private setRoutes(definedRoutes: Routes<T>) {
        const routes: Partial<RouterRoutes<T>> = {};
        definedRoutes.forEach(this.getRouterRoutes(routes));
        
        const routesRouter = this.parseRouterRoutes(routes);
        this.routes = routesRouter;
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

    private parseRouterRoutes(routes: Partial<RouterRoutes<T>>) {
        const routesRouter = this.schemaRoute?.parse(routes);
        if(!nonNullish(routesRouter)) {
            throw new Error('Set all paths in routes!');
        }
        return Object.freeze(routesRouter);
    }

}