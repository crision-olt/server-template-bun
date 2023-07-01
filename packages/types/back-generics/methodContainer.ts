import { SchemaHandlerRoute } from "./handlerRoute";
import { SchemaMethod } from "./method";
import { z } from 'zod';

export const SchemaMethodContainer = z.tuple([SchemaMethod, SchemaHandlerRoute]);
export type MethodContainer = z.infer<typeof SchemaMethodContainer>;
