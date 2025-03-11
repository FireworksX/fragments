import { GraphState, LinkKey } from "@graph-state/core";
import { getParent } from "@/shared/helpers/getParent";
import { nodes } from "@/definitions";

export const isTopLevel = (manager: GraphState, layerKey: LinkKey) => {
  return getParent(manager, layerKey)?._type === nodes.Fragment;
};
