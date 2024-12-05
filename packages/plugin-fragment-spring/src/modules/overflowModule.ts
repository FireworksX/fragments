import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringOverflow } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { overflow } from "@fragments/plugin-fragment";

export function overflowModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringOverflow<T> {
  return {
    ...node,
    overflow: getStableValue(node, "overflow", overflow.hidden, cache),
    setOverflow: (value: number) =>
      setValueToNode(node, "overflow", value, cache),
  };
}
