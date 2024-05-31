import { AnyObject } from "../types";

export function omit<T extends AnyObject, P extends string[]>(obj: T, ...props: P): Omit<T, P[number]> {
  const result = { ...obj }
  props.forEach(prop => {
    delete result[prop]
  })
  return result
}