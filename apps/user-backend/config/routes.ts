import { Paths } from '../enums/paths';
import type { User } from 'types/models/User';

const user: User = {
    id: '1',
    name: 'Bun',
    email: 'crision.olt@gmail.com',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'super-admin',
    permissions: [
        'user:read',
        'user:write',
        'user:delete',
        'user:edit',
    ],
    blocked:false,
}
export const routes = 
{
    [Paths.FAVICON]: {
        GET: () => {
            //return favicon
            return new Response(`Bun!`);
        },
    },
    [Paths.ROOT]: {
        GET: () => {
            return new Response(`Bun!`);
        },
    },
    [Paths.USER]: {
        GET: () => {
            return new Response(JSON.stringify([user]));
        },
    },
}
       
