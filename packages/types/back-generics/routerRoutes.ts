import { RouterMethodContainer } from "./routerMethodContainer"

export type RouterRoutes<T extends string> = {
    [key in T]: RouterMethodContainer
}