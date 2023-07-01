import { HandlerRoute } from 'types/back-generics/handlerRoute';
import { Method } from 'types/back-generics/method';
import { nonNullish } from 'utils/nonNullish';
import { ZodSchema } from 'zod';
import { GetRouter } from './Router.class';
import { MethodContainer } from 'types/back-generics/methodContainer';
import { OptionalRecord } from 'types/optionalRecord';

export const GetHealthyRouter = <
        Paths extends string,
        SchemaRouterRoutes extends ZodSchema, 
        Routes extends [Paths, MethodContainer[]][], 
        RouterRoutes extends OptionalRecord<Paths, [Method, HandlerRoute][]>
    > (Router: ReturnType<typeof GetRouter<Paths, Routes, RouterRoutes>>, schemaRoute: SchemaRouterRoutes) => class HealthyRouter extends Router  {
    

    constructor(definedRoutes: Routes) {
        super(definedRoutes);
    }

    public static transformRoutes(definedRoutes: Routes) {
        const routes = Router.transformRoutes(definedRoutes);
        const transformedRoutes = this.parseRouterRoutes(routes);
        return transformedRoutes;
    }

    public static parseRouterRoutes(routes: RouterRoutes) {
        const routesRouter = schemaRoute.parse(routes);
        if(nonNullish(routesRouter)) {
            return routesRouter;
        }
        throw new Error('Set all paths in routes!');
    }

}