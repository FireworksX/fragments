import { nodes } from "@fragments/plugin-fragment";
import { GraphState, LinkKey } from "@graph-state/core";
import { getParent } from "@/shared/helpers/getParent.ts";

export const isTopLevel = (manager: GraphState, layerKey: LinkKey) => {
  return getParent(manager, layerKey)?._type === nodes.Fragment;
};
