import { BaseNode, WithPosition } from "@/types";
import { GraphState } from "@graph-state/core";
import { positionType } from "@/definitions.ts";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function positionModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithPosition<T> {
  return {
    ...node,
    top: getStableValue(node, "top", 0, cache),
    left: getStableValue(node, "left", 0, cache),
    positionType: getStableValue<keyof typeof positionType>(
      node,
      "positionType",
      positionType.absolute,
      cache
    ),
    setPositionType(type) {
      setValueToNode(node, "positionType", type, cache);

      return cache.resolve(node) as WithPosition<T>;
    },
    move(top: number, left: number) {
      setValueToNode(node, "top", top, cache);
      setValueToNode(node, "left", left, cache);

      return cache.resolve(node) as WithPosition<T>;
    },
  };
}
