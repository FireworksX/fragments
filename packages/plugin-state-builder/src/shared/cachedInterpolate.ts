import { to } from "@react-spring/core";
import { isObject, isPrimitive } from "@fragments/utils";

export const createCachedInterpolate = () => {
  let instance: any = null;
  let instanceCacheKey: string = "";

  return (
    parents: ReadonlyArray<any>,
    callback: (...values: any[]) => unknown
  ) => {
    const cacheKey = parents
      .reduce((resultKeys, parent) => {
        if (isPrimitive(parent)) {
          return [...resultKeys, parent];
        }

        if (isObject(parent) && "id" in parent) {
          return [...resultKeys, parent.id];
        }

        return resultKeys;
      }, [])
      .join("_");

    if (instance && cacheKey === instanceCacheKey) return instance;

    instance = to(parents, callback);
    instanceCacheKey = cacheKey;

    return instance;
  };
};
