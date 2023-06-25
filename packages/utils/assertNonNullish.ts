import { nonNullish } from "./nonNullish"

export const assertNonNullish = <T>(value: T): asserts value is NonNullable<T> => {
    if (nonNullish(value)) {
        return;
    }
    throw new Error(`Expected non-nullish value, got ${value}`)
}