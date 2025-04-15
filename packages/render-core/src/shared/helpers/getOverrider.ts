import { Entity, GraphState } from "@graph-state/core";
import { isPartOfPrimary } from "@/shared/helpers/isPartOfPrimary.ts";
import { getKey } from "@/shared/helpers/keys";

export const getOverrider = (manager: GraphState, layerEntity: Entity) => {
  const layer = manager.resolve(layerEntity);
  return manager.resolve(getKey(layer?.overrideFrom) ?? layerEntity);
  // console.log(layerEntity, getKey(layer?.overrideFrom));

  // const layerKey = manager.keyOfEntity(layerEntity);
  // const layerParents = manager.resolveParents(layerKey);
  // const isPartialPrimary = isPartOfPrimary(manager, layerKey);
  //
  // return isPartialPrimary
  //   ? manager.resolve(layerKey)
  //   : layerParents?.find((parent) => parent?.overrides?.includes(layerKey));
};
