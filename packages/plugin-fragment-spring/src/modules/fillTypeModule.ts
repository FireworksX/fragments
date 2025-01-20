import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringFillType } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function fillTypeModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringFillType<T> {
  return {
    ...node,
    fillType: getSpringValue(node, "fillType", null, cache),
    setFillType: (value: number) =>
      setValueToNode(node, "fillType", value, cache),
  };
}
