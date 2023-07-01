import z from "zod";

import { GetSchemaRouterRoutes } from "types/back-generics/routerRoutes"
import { GetRouter } from "class-container/Router.class";
import { GetHealthyRouter } from "class-container/HealthyRouter.class";

import { Paths, SchemaPath } from "../enums/paths";
import { Routes, routes } from "./routes";

export const SchemaRouterRoutes = GetSchemaRouterRoutes(SchemaPath);
export type RouterRoutes = z.infer<typeof SchemaRouterRoutes>;
const Router = GetRouter<Paths, Routes, RouterRoutes>();
const HealthyRouter = GetHealthyRouter<Paths, typeof SchemaRouterRoutes, Routes, RouterRoutes>(Router, SchemaRouterRoutes);

export const router = new HealthyRouter(routes);
