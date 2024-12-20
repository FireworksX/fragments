import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringVisible } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function visibleModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringVisible<T> {
  return {
    ...node,
    visible: getSpringValue(node, "visible", true, cache),
    setVisible: (value: number) =>
      setValueToNode(node, "visible", value, cache),
  };
}
