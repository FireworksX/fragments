import { getOverrider } from "@/shared/helpers/getOverrider.ts";
import { getLayerSchema } from "@/lib/getLayerSchema.ts";
import { parseRawLayer } from "@/lib/parseRawLayer.ts";
import { Entity, GraphState } from "@graph-state/core";

export const getLayer = (manager: GraphState, layer: Entity) => {
  if (!manager || !layer) return null;

  const layerKey = manager.keyOfEntity(layer);
  const layerData = manager.resolve(layerKey);
  const overrider = getOverrider(manager, layerKey);
  const schema = getLayerSchema(layerData);

  if (!schema || !layerData) return null;

  return parseRawLayer(schema, layerData, {
    overrideTarget: overrider,
  });
};
