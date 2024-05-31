import { AnyObject } from "../types";

export const set = (obj: AnyObject, path: string, value: unknown) => {
  const pathArray = (Array.isArray(path) ? path : path.match(/([^[.\]])+/g)) as string[]

  return pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {}
    if (i === pathArray.length - 1) acc[key] = value
    return acc[key]
  }, obj)
}