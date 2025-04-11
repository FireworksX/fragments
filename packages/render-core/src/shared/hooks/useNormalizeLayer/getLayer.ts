import { Entity, GraphState } from "@graph-state/core";
import { getNormalizeLayer } from "@fragmentsx/definition";
import { getOverrider } from "@/shared/helpers";

export const getLayer = (manager: GraphState, layer: Entity) => {
  if (!manager || !layer) return null;

  const layerKey = manager.keyOfEntity(layer);
  const layerData = manager.resolve(layerKey);
  const overrider = getOverrider(manager, layerKey);

  return getNormalizeLayer(layerData, overrider);
};
