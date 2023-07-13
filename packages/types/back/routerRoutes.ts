import { SchemaRouterMethodContainer } from "./routerMethodContainer"
import z from 'zod';

export const SchemaRouterRoutes = z.record(z.string(), SchemaRouterMethodContainer);
export type RouterRoutes = z.infer<typeof SchemaRouterRoutes>;