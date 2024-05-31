import { AnyObject } from "../types";
import { iterator } from "./iterator";

export const findDeep = (
  input: unknown[] | AnyObject,
  predicate: (key: PropertyKey, value: unknown, path: string) => boolean
): unknown | undefined => {
  try {
    iterator(input, (key, value, path) => {
      if (predicate(key, value, path)) {
        throw { key, value, path }
      }

      return value
    })
  } catch (findValue) {
    return findValue as any
  }
}