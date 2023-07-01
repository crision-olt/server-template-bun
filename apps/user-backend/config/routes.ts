import { GetSchemaRoutes } from 'types/back-generics/routes';
import { SchemaPath, Paths } from '../enums/paths';
import { z } from 'zod';

export const SchemaRoutes = GetSchemaRoutes(SchemaPath);
export type Routes = z.infer<typeof SchemaRoutes>;

export const routes = SchemaRoutes.parse([
    [
        Paths.FAVICON,
        [
            [
                'GET',
                () => {
                    //return favicon
                    return new Response(`Bun!`);
                }
            ],
        ]
    ],
    [
        Paths.ROOT,
        [
            [
                'GET',
                () => {
                    return new Response(`Bun!`);
                }
            ],
        ]
    ],
    [
        Paths.USER, 
        [
            [
                'GET', 
                () => {
                    return new Response(`Bun!`);
                }
            ],
        ]
    ],
    [
        Paths.USER_ID, 
        [
            [
                'GET', 
                () => {
                    return new Response(`Bun!`);
                }
            ],
        ]
    ],
])
