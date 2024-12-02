import { GraphState } from "@graph-state/core";
import { BaseNode, WithLayer, WithSpringLayer } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import {
  layerAlign,
  layerDirection,
  layerDistribute,
  layerMode,
} from "@/definitions.ts";

export function layerModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringLayer<T> {
  return {
    ...node,
    layerMode: getStableValue(node, "layerMode", layerMode.none, cache),
    layerAlign: getStableValue(node, "layerAlign", layerAlign.start, cache),
    layerDirection: getStableValue(
      node,
      "layerDirection",
      layerDirection.horizontal,
      cache
    ),
    layerDistribute: getStableValue(
      node,
      "layerDistribute",
      layerDistribute.start,
      cache
    ),
    layerWrap: getStableValue(node, "layerWrap", false, cache),
    layerGap: getStableValue(node, "layerGap", 0, cache),

    setLayerMode(mode: typeof layerMode) {
      if (Object.keys(layerMode).includes(mode)) {
        setValueToNode(node, "layerMode", mode, cache);
      }
    },
    setLayerDirection(direction: typeof layerDirection) {
      if (Object.keys(layerDirection).includes(direction)) {
        setValueToNode(node, "layerDirection", direction, cache);
      }
    },
    setLayerDistribute(distribute: typeof layerDistribute) {
      if (Object.keys(layerDistribute).includes(distribute)) {
        setValueToNode(node, "layerDistribute", distribute, cache);
      }
    },
    setLayerAlign(align: typeof layerAlign) {
      if (Object.keys(layerAlign).includes(align)) {
        setValueToNode(node, "layerAlign", align, cache);
      }
    },
    setLayerWrap(isWrap: boolean) {
      if (typeof isWrap === "boolean") {
        setValueToNode(node, "layerWrap", isWrap, cache);
      }
    },
    setLayerGap(gap: number) {
      if (typeof gap === "number") {
        setValueToNode(node, "layerGap", gap, cache);
      }
    },
  };
}
