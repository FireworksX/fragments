import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringZIndex } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function zIndexModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringZIndex<T> {
  return {
    ...node,
    zIndex: getSpringValue(node, "zIndex", null, cache),
    setZIndex: (value: number) => setValueToNode(node, "zIndex", value, cache),
  };
}
