import { z } from "zod";

export enum Paths {
    FAVICON = '/favicon.ico',
    ROOT = '/',
    USER = '/user',
    USER_ID = '/user/:id',

};

export const SchemaPath = z.nativeEnum(Paths);