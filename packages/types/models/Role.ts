import { EnumModel } from "../back/EnumModel";
import { Model } from "../back/model";

export interface Role extends Model, EnumModel {
    name: string;
    description: string;
    permissions: Array<string>;
}