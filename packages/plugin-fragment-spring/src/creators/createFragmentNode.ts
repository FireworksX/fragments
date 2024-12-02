import { nodes } from "@/definitions.ts";
import { applyModules } from "@/shared/applyModules.ts";
import { GraphState } from "@graph-state/core";
import { childrenModule, createBaseNode } from "@fragments/plugin-fragment";

export const modules = [childrenModule];

export function createFragmentNode(
  initialNode: Partial<unknown> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Fragment, initialNode, cache);
  const fragmentNode = applyModules(baseNode, modules, cache);

  return {
    ...fragmentNode,
  };
}
