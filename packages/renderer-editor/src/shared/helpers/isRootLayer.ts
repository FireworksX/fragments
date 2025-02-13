import { nodes } from "@fragments/plugin-fragment";
import { getParent } from "@/shared/helpers/getParent.ts";
import { LinkKey } from "@graph-state/core";

export const isRootLayer = (manager, layerKey: LinkKey) => {
  const resolvedNode = manager?.resolve?.(layerKey);
  return (
    getParent(layerKey)?._type === nodes.Fragment && !resolvedNode?.isBreakpoint
  );
};
