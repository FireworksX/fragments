import { GraphState } from "@graph-state/core";
import { BaseNode, WithFillType, WithZIndex } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { paintMode } from "@/definitions.ts";

export function fillTypeModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithFillType<T> {
  return {
    ...node,
    fillType: getStableValue(node, "fillType", paintMode.Solid, cache),
    setFillType: (value: number) =>
      setValueToNode(node, "fillType", value, cache),
  };
}
