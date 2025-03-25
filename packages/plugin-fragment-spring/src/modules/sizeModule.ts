import { GraphState } from "@graph-state/core";
import { BaseNode, WithSize, WithSpringSize } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getFieldValue } from "@fragments/plugin-fragment";
import { isFiniteNumber } from "@fragments/utils";
import { positiveValue } from "@fragments/utils";

export function sizeModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringSize<BaseNode> {
  const widthSetter = (value: number) =>
    setValueToNode(node, "width", isFiniteNumber(value) ? value : 0, cache);
  const heightSetter = (value: number) =>
    setValueToNode(node, "height", isFiniteNumber(value) ? value : 0, cache);

  const setWidth = (value: number) => {
    value = positiveValue(value);
    if (typeof value !== "number") {
      return;
    }

    const aspectRatio = getFieldValue(node, "aspectRatio", cache);
    const isSynced = getFieldValue(node, "aspectRatioSynced", cache);

    widthSetter(value);
    if (isSynced) {
      heightSetter(+(value * aspectRatio).toFixed(1));
    }
  };

  const setHeight = (value: number) => {
    value = positiveValue(value);

    if (typeof value !== "number") {
      return;
    }

    const aspectRatio = getFieldValue(node, "aspectRatio", cache);
    const isSynced = getFieldValue(node, "aspectRatioSynced", cache);

    heightSetter(value);
    if (isSynced) {
      widthSetter(+(value / aspectRatio).toFixed(1));
    }
  };

  return {
    ...node,
    width: getSpringValue(node, "width", 200, cache),
    height: getSpringValue(node, "height", 200, cache),
    setWidth,
    setHeight,
  };
}
