import { EnumModel } from "../back/EnumModel";
import { Model } from "../back/model";

export interface Permission extends Model, EnumModel {
    name: string;
    description: string;
}