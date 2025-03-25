import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringOverflow } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { overflow } from "@fragments/plugin-fragment";

export function overflowModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringOverflow<T> {
  return {
    ...node,
    overflow: getSpringValue(node, "overflow", overflow.hidden, cache),
    setOverflow: (value: number) =>
      setValueToNode(node, "overflow", value, cache),
  };
}
