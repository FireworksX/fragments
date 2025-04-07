import { Entity, GraphState } from "@graph-state/core";
import { createLayer } from "@/shared/helpers/createLayer.ts";

export const cloneLayer = (
  manager: GraphState,
  layer: Entity,
  externalProps = {}
) => {
  const layerGraph = manager.resolve(layer);

  if (layerGraph) {
    const clonedChildren = (layerGraph?.children ?? []).map((child) =>
      cloneLayer(manager, child)
    );
    const clonedLayer = createLayer(
      {
        _type: layerGraph._type,
        children: clonedChildren,
        ...externalProps,
        ...layerGraph,
      },
      true
    );

    const clonedKey = manager.mutate(clonedLayer);

    manager.mutate(manager.keyOfEntity(layerGraph), {
      overrides: [clonedKey],
    });

    return clonedKey;
  }

  return null;
};
