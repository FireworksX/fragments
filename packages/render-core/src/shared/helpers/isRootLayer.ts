import { getParent } from "@/shared/helpers/getParent";
import { GraphState, LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";

export const isRootLayer = (manager: GraphState, layerKey: LinkKey) => {
  const resolvedNode = manager?.resolve?.(layerKey);

  return (
    getParent(manager, layerKey)?._type === definition.nodes.Fragment &&
    !resolvedNode?.isBreakpoint
  );
};
