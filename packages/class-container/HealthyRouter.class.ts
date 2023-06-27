import { Routes } from 'types/back-generics/routes';
import { RouterRoutes } from 'types/back-generics/routerRoutes';
import { Router } from 'class-container/Router.class';
import { nonNullish } from 'utils/nonNullish';
import { ZodSchema, ZodTypeDef } from 'zod'; 

type SchemaRouterRoutes<T extends string> = ZodSchema<RouterRoutes<T>, ZodTypeDef, Partial<RouterRoutes<T>>>;

class HealthyRouter<T extends string> extends Router<T>  {
    
    private schemaRoute: SchemaRouterRoutes<T> | undefined = undefined;

    constructor(definedRoutes: Routes<T>, schemaRoute: SchemaRouterRoutes<T>) {
        super(definedRoutes);
        this.setSchemaRoute(schemaRoute);
    }

    private setSchemaRoute(schemaRoute: SchemaRouterRoutes<T>) {
        this.schemaRoute = schemaRoute;
    }

    public transformRoutes(definedRoutes: Routes<T>) {
        const routes = super.transformRoutes(definedRoutes);
        const transformedRoutes = this.parseRouterRoutes(routes);
        return transformedRoutes;
    }

    private parseRouterRoutes(routes: Partial<RouterRoutes<T>>) {
        const routesRouter = this.schemaRoute?.parse(routes);
        if(!nonNullish(routesRouter)) {
            throw new Error('Set all paths in routes!');
        }
        return routesRouter;
    }

}