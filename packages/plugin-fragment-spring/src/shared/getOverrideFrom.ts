import { Entity, GraphState } from "@graph-state/core";

export const getOverrideFrom = (entity: Entity, cache: GraphState) => {
  const entityKey = cache.keyOfEntity(entity);
  const cacheParents = cache.resolveParents(entityKey);
  return cache.keyOfEntity(
    cacheParents.find((parent) => parent.overrides?.includes(entityKey))
  );
};
