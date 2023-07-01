import { SchemaHandlerRoute } from "./handlerRoute";
import { SchemaMethod } from "./method";
import { z } from 'zod';

export const SchemaRouterMethodContainer = z.tuple([SchemaMethod, SchemaHandlerRoute]);
export type RouterMethodContainer = z.infer<typeof SchemaRouterMethodContainer>;