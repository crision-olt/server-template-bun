import { SchemaMethodContainer } from "./methodContainer";
import z, {EnumLike, ZodNativeEnum} from 'zod';

export const GetSchemaRoute = <T extends EnumLike>(schema: ZodNativeEnum<T>) => z.tuple([schema, z.array(SchemaMethodContainer)]);