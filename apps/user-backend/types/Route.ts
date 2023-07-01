import { GetSchemaRoute } from 'types/back-generics/route';
import { SchemaPath } from '../enums/paths';
import { z } from 'zod';

export const RouteSchema = GetSchemaRoute(SchemaPath)
export type RouteType = z.infer<typeof RouteSchema>;
