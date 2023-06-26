import { HandlerRoute } from "./handlerRoute";
import { Method } from "./method";

export type RouterMethodContainer = {
    [key in Method]?: HandlerRoute;
};