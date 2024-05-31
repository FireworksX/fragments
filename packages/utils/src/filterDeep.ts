import { AnyObject } from "../types";
import { iterator } from "./iterator";

export const filterDeep = (
  input: unknown[] | AnyObject,
  predicate: (key: PropertyKey, value: unknown, path: string, resultArray: unknown[]) => boolean
) => {
  const result: unknown[] = []

  iterator(input, (key, value, path) => {
    if (predicate(key, value, path, result)) {
      result.push({ key, value, path })
    }

    return value
  })

  return result
}