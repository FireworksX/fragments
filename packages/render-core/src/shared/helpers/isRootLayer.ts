import { getParent } from "@/shared/helpers/getParent";
import { GraphState, LinkKey } from "@graph-state/core";
import { nodes } from "@/definitions";

export const isRootLayer = (manager: GraphState, layerKey: LinkKey) => {
  const resolvedNode = manager?.resolve?.(layerKey);
  return (
    getParent(manager, layerKey)?._type === nodes.Fragment &&
    !resolvedNode?.isBreakpoint
  );
};
