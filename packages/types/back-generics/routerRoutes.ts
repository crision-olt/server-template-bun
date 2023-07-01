import { SchemaRouterMethodContainer } from "./routerMethodContainer"
import z, { EnumLike, ZodNativeEnum } from 'zod';

export const GetSchemaRouterRoutes = <T extends EnumLike>(schema: ZodNativeEnum<T>) => z.record(schema, z.array(SchemaRouterMethodContainer));