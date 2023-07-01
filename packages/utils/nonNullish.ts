import { Nullable } from 'types/nullable'
export const nonNullish = <T>(value: T): value is Exclude<T, Nullable> => {
    return value !== null && value !== undefined
}