import { z } from 'zod';

export const SchemaParams = z.record(z.never()).optional();
export type Params = z.infer<typeof SchemaParams>;
