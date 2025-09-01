import { Entity, GraphState } from "@graph-state/core";
import { createLayer } from "@/shared/helpers/createLayer.ts";

export const copyLayer = (manager: GraphState, layer: Entity) => {
  const layerGraph = manager.resolve(layer);

  if (layerGraph) {
    const layer = createLayer(
      {
        _type: layerGraph._type,
        ...layerGraph,
      },
      true
    );

    if (layerGraph?.children && layer) {
      layer.children = (layerGraph?.children ?? []).map((child) =>
        copyLayer(manager, child)
      );
    }

    return layer;
  }

  return null;
};
