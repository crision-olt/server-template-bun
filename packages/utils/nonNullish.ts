export const nonNullish = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined
}