import { BaseNode, WithSpringPosition } from "@/types";
import { GraphState } from "@graph-state/core";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getFieldValue, positionType } from "@fragments/plugin-fragment";
import { isFiniteNumber } from "@fragments/utils";
import { animatableValue } from "@/shared/animatableValue.ts";

export function positionModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringPosition<T> {
  return {
    ...node,
    top: getSpringValue(node, "top", 0, cache),
    left: getSpringValue(node, "left", 0, cache),
    positionType: getSpringValue<keyof typeof positionType>(
      node,
      "positionType",
      positionType.absolute,
      cache
    ),
    setPositionType(type) {
      setValueToNode(node, "positionType", type, cache);
      return cache.resolve(node) as WithSpringPosition<T>;
    },
    move(top: number, left: number) {
      const nodeGraph = cache.resolve(node);
      const nodePositionType = animatableValue(
        getFieldValue(nodeGraph, "positionType", cache)
      );

      if (nodePositionType === positionType.absolute) {
        if (typeof top === "number" && isFiniteNumber(top)) {
          setValueToNode(node, "top", top, cache);
        }
        if (typeof left === "number" && isFiniteNumber(left)) {
          setValueToNode(node, "left", left, cache);
        }
      }

      return cache.resolve(node) as WithSpringPosition<T>;
    },
  };
}
