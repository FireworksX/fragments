import { GraphState, LinkKey } from "@graph-state/core";

export const getParent = (manager: GraphState, layerKey: LinkKey) => {
  const parents = manager?.resolveParents?.(layerKey) ?? [];
  return parents?.find((parent) => parent?.children?.includes(layerKey));
};
