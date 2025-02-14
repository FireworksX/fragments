import { Entity, GraphState, LinkKey } from "@graph-state/core";

export const getOverriderByLayers = (layerKey: LinkKey, layers: unknown[]) => {
  return layers.find((l) => l?.overrides?.includes(layerKey));
};
