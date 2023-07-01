import {GetSchemaRouterRoutes} from "types/back-generics/routerRoutes";
import {SchemaPath, Paths} from "../enums/paths";
import z from "zod";

export const SchemaRouterRoutes = GetSchemaRouterRoutes(SchemaPath);
export type RouterRoutes = z.infer<typeof SchemaRouterRoutes>;
