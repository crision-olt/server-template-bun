import { z } from 'zod';

export const SchemaMethod = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
export type Method = z.infer<typeof SchemaMethod>;
