import { GraphState } from "@graph-state/core";
import { BaseNode, WithOpacity, WithOverflow, WithVisible } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { overflow } from "@/definitions.ts";

export function overflowModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithOverflow<T> {
  return {
    ...node,
    overflow: getStableValue(node, "overflow", overflow.visible, cache),
    setOverflow: (value: number) =>
      setValueToNode(node, "overflow", value, cache),
  };
}
