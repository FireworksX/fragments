import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringZIndex } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function zIndexModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringZIndex<T> {
  return {
    ...node,
    zIndex: getStableValue(node, "zIndex", null, cache),
    setZIndex: (value: number) => setValueToNode(node, "zIndex", value, cache),
  };
}
