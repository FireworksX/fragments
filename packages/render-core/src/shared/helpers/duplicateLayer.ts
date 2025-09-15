import { Entity, GraphState, keyOfEntity, LinkKey } from "@graph-state/core";
import { createLayer } from "@/shared/helpers/createLayer.ts";
import { getParent } from "@/shared/helpers/getParent";
import { insertChildren } from "@/shared/helpers/children";
import { generateId, setKey } from "@fragmentsx/utils";

export const duplicateLayer = (
  manager: GraphState,
  layer: Entity,
  _deep?: boolean,
  _newParent?: LinkKey
) => {
  const layerGraph = manager.resolve(layer);

  if (layerGraph) {
    const nextId = generateId();
    const nextLayerKey = keyOfEntity({
      _type: layerGraph._type,
      _id: nextId,
    });

    const clonedChildren = (layerGraph?.children ?? []).map((child) =>
      duplicateLayer(manager, child, true, nextLayerKey)
    );

    // console.log(layerGraph, nextLayerKey);
    const duplicatedLayer = createLayer(
      {
        _type: layerGraph._type,
        ...layerGraph,
        _id: nextId,
        parent: _deep ? setKey(_newParent) : layerGraph?.parent,
        children: clonedChildren,
      },
      false
    );

    const duplicatedKey = manager.mutate(duplicatedLayer);

    if (!_deep) {
      const parent = getParent(manager, layer);
      if (parent) {
        const layerIndex = parent?.children?.findIndex(
          (child) => child === manager.keyOfEntity(layer)
        );

        insertChildren(manager, parent, layerIndex + 1, duplicatedKey);
        // manager.mutate(manager.keyOfEntity(parent), {
        //   children: [duplicatedKey],
        // });
      }
    }

    return duplicatedKey;
  }

  return null;
};
