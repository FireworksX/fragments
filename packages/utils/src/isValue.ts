import { isEmptyValue } from "./isEmptyValue";

export const isValue = <T>(value: T): value is Exclude<T, null | undefined> => !isEmptyValue(value)
