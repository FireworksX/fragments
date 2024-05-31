import { AnyObject } from "../types";

export const pick = <TValue extends AnyObject>(obj: TValue, ...props: (keyof TValue)[]) => {
  return props.reduce((result, prop) => {
    result[prop] = obj[prop]
    return result
  }, {} as any)
}