import { nodes } from "@fragments/plugin-fragment";
import { getParent } from "@/shared/helpers/getParent.ts";
import { GraphState, LinkKey } from "@graph-state/core";

export const isRootLayer = (manager: GraphState, layerKey: LinkKey) => {
  const resolvedNode = manager?.resolve?.(layerKey);
  return (
    getParent(manager, layerKey)?._type === nodes.Fragment &&
    !resolvedNode?.isBreakpoint
  );
};
