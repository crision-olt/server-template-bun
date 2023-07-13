import { Router } from "router";

import { routes } from "./routes";
import { SchemaRouterRoutes } from "types/back/routerRoutes";

;
export const router = new Router(SchemaRouterRoutes.parse(routes));
