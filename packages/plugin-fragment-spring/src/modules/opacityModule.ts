import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringOpacity } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function opacityModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringOpacity<T> {
  return {
    ...node,
    opacity: getStableValue(node, "opacity", 1, cache),
    setOpacity: (value: number) =>
      setValueToNode(node, "opacity", value, cache),
  };
}
