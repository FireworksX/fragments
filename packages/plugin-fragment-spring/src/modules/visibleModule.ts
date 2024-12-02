import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringVisible } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function visibleModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringVisible<T> {
  return {
    ...node,
    visible: getStableValue(node, "visible", true, cache),
    setVisible: (value: number) =>
      setValueToNode(node, "visible", value, cache),
  };
}
