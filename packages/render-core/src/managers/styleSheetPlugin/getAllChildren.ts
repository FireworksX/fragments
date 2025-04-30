import { Entity } from "@graph-state/core";

export const getAllChildren = (state, start: Entity, acc: string[] = []) => {
  const cache = state.styleSheetCache;
  const layerKey = state.keyOfEntity(start);
  const { layer } = cache.get(layerKey) ?? {};

  if (acc.length === 0) {
    acc.push(layerKey);
  }

  layer?.children?.forEach((child) => {
    acc.push(child);
    getAllChildren(state, child, acc);
  });

  return acc;
};
