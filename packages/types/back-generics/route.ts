import { MethodContainer } from "./methodContainer";

export type Route<T extends string> = [T ,MethodContainer[]];