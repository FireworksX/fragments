import { GraphState } from "@graph-state/core";
import { BaseNode, WithSize, WithSpringSize } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getFieldValue } from "@fragments/plugin-fragment";

export function sizeModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringSize<BaseNode> {
  const widthSetter = (value: number) =>
    setValueToNode(node, "width", value, cache);
  const heightSetter = (value: number) =>
    setValueToNode(node, "height", value, cache);

  const setWidth = (value: number) => {
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
