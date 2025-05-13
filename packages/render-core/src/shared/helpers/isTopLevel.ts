import { GraphState, LinkKey } from "@graph-state/core";
import { getParent } from "@/shared/helpers/getParent";
import { definition } from "@fragmentsx/definition";

export const isTopLevel = (manager: GraphState, layerKey: LinkKey) => {
  return getParent(manager, layerKey)?._type === definition.nodes.Fragment;
};
