import { Entity } from "@graph-state/core";

export const getParent = (input: Entity, cache) => {
  const inputKey = cache.keyOfEntity(input);
  const cacheParents = cache.resolveParents(inputKey);
  const cacheParent = cacheParents.find((parent) =>
    parent?.children?.includes(inputKey)
  );

  if (cacheParent) {
    return cache.resolve(cacheParent);
  }

  return null;
};
