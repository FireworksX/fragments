import { Entity, GraphState } from "@graph-state/core";
import { isPartOfPrimary } from "@/shared/helpers/isPartOfPrimary.ts";

export const getOverrider = (manager: GraphState, layer: Entity) => {
  const layerKey = manager.keyOfEntity(layer);
  const layerParents = manager.resolveParents(layerKey);
  const isPartialPrimary = isPartOfPrimary(manager, layerKey);

  return isPartialPrimary
    ? manager.resolve(layerKey)
    : layerParents?.find((parent) => parent?.overrides?.includes(layerKey));
};
