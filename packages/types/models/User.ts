import type {Model} from '../back/model';
import { Permission } from './Permission';
import { Role } from './Role';
export interface User extends Model {
    name: string;
    email: string;
    password: string;
    role: Role['reference'];
    permissions: Array<Permission['reference']>;
    blocked: boolean;
};