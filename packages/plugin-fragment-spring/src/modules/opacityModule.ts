import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringOpacity } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function opacityModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringOpacity<T> {
  return {
    ...node,
    opacity: getSpringValue(node, "opacity", 1, cache),
    setOpacity: (value: number) =>
      setValueToNode(node, "opacity", value, cache),
  };
}
