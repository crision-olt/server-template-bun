import { z } from 'zod';
import { SchemaParams } from './params';

export const SchemaHandlerRoute = z.function().args(z.instanceof(Request).optional(), SchemaParams.optional()).returns(z.instanceof(Response));
export type HandlerRoute = z.infer<typeof SchemaHandlerRoute>;
