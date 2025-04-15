import { GraphState, LinkKey } from "@graph-state/core";
import { getKey } from "@/shared/helpers/keys";

export const getParent = (manager: GraphState, layerKey: LinkKey) => {
  const layer = manager.resolve(layerKey);
  return manager.resolve(getKey(layer?.parent) ?? null);
  // const parents = manager?.resolveParents?.(layerKey) ?? [];
  // return parents?.find((parent) => parent?.children?.includes(layerKey));
};
