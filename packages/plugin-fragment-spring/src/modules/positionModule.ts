import { BaseNode, WithSpringPosition } from "@/types";
import { GraphState } from "@graph-state/core";
import { positionType } from "@/definitions.ts";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

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
      if (typeof top === "number") {
        setValueToNode(node, "top", top, cache);
      }
      if (typeof left === "number") {
        setValueToNode(node, "left", left, cache);
      }

      return cache.resolve(node) as WithSpringPosition<T>;
    },
  };
}
