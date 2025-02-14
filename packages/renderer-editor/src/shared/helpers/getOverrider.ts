import { Entity, GraphState } from "@graph-state/core";

export const getOverrider = (layer: Entity, manager: GraphState) => {
  const layerKey = manager.keyOfEntity(layer);
  const layerParents = manager.resolveParents(layerKey);

  return layerParents?.find((parent) => parent?.overrides?.includes(layerKey));
};
