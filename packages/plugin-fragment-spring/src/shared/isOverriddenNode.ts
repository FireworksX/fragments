import { GraphState } from "@graph-state/core";

export const isOverriddenNode = (node: any, cache: GraphState) => {
  return !!cache?.resolve(node)?.overrideFrom;
};
