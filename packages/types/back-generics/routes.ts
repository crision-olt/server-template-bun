import { GetSchemaRoute } from "./route";
import z, { EnumLike, ZodNativeEnum } from 'zod';

export const GetSchemaRoutes = <T extends EnumLike>(schema: ZodNativeEnum<T>) => z.array(GetSchemaRoute<T>(schema));