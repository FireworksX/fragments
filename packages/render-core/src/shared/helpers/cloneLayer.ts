import { Entity, GraphState } from "@graph-state/core";
import { createLayer } from "@/shared/helpers/createLayer.ts";
import { isBrowser, omit, pick } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";
import { setKey } from "@/shared/helpers/keys";
import { getParent } from "@/shared/helpers/getParent";

export const cloneLayer = (
  manager: GraphState,
  layer: Entity,
  externalProps = {},
  _parent
) => {
  const layerGraph = manager.resolve(layer);
  const layerKey = manager.keyOfEntity(layer);
  const layerParent =
    _parent ?? manager.keyOfEntity(getParent(manager, layerKey));

  if (layerGraph) {
    const clonedLayer = createLayer(
      {
        _type: layerGraph._type,
        overrideFrom: setKey(layerKey),
        parent: setKey(layerParent),
        ...(layerGraph?._type === definition.nodes.Instance
          ? pick(layerGraph, "fragment")
          : {}),
        ...externalProps,
      },
      true
    );

    const clonedChildren = (layerGraph?.children ?? []).map((child) =>
      cloneLayer(manager, child, {}, manager.keyOfEntity(clonedLayer))
    );

    const clonedKey = manager.mutate({
      ...clonedLayer,
      children: clonedChildren,
    });

    manager.mutate(layerKey, {
      overrides: [clonedKey],
    });

    return clonedKey;
  }

  return null;
};
