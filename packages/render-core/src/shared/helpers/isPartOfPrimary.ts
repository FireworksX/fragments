import { Entity, GraphState, LinkKey } from "@graph-state/core";
import { getAllParents } from "./getAllParents";

export const isPartOfPrimary = (manager: GraphState, layerKey: Entity) => {
  const allParents = getAllParents(manager, manager.keyOfEntity(layerKey));
  const layer = manager.resolve(layerKey);

  return (
    layer?.isPrimary ?? !!allParents?.find?.((parent) => !!parent?.isPrimary)
  );
};
