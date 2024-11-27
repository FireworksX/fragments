import { to } from "@react-spring/core";

const globalCache = new Map<string, any>();

export const createConstantInterpolate = (cacheKey: string) => {
  return (
    parents: ReadonlyArray<any>,
    callback: (...values: any[]) => unknown
  ) => {
    if (globalCache.has(cacheKey)) {
      return globalCache.get(cacheKey);
    }

    const result = to(parents, callback);
    globalCache.set(cacheKey, result);

    return result;
  };
};
