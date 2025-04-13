import { Entity, GraphState } from "@graph-state/core";
import { createLayer } from "@/shared/helpers/createLayer.ts";
import { getParent } from "@/shared/helpers/getParent";
import { insertChildren } from "@/shared/helpers/children";

export const duplicateLayer = (
  manager: GraphState,
  layer: Entity,
  _deep?: boolean
) => {
  const layerGraph = manager.resolve(layer);

  if (layerGraph) {
    const clonedChildren = (layerGraph?.children ?? []).map((child) =>
      duplicateLayer(manager, child, true)
    );

    const duplicatedLayer = createLayer(
      {
        _type: layerGraph._type,
        ...layerGraph,
        children: clonedChildren,
      },
      true
    );

    const duplicatedKey = manager.mutate(duplicatedLayer);

    if (!_deep) {
      const parent = getParent(manager, layer);
      if (parent) {
        const layerIndex = manager
          .resolve(parent)
          ?.children?.findIndex(
            (child) => child === manager.keyOfEntity(layer)
          );

        insertChildren(manager, parent, layerIndex + 1, duplicatedKey);
        // manager.mutate(manager.keyOfEntity(parent), {
        //   children: [duplicatedKey],
        // });

        console.log(manager.resolve(manager.keyOfEntity(parent)));
      }
    }

    return duplicatedKey;
  }

  return null;
};
