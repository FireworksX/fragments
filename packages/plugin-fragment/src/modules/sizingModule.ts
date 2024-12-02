import { sizing } from "@/definitions.ts";
import { BaseNode, WithSizing } from "@/types";
import { GraphState } from "@graph-state/core";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getFieldValue } from "@/shared/getFieldValue.ts";

const ALLOW_SIZES = [sizing.Fixed, sizing.Relative];

export function sizingModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSizing<T> {
  const setSizeMode = (
    mode: "horizontal" | "vertical",
    value: keyof typeof sizing
  ) => {
    if (Object.keys(sizing).includes(value)) {
      if (mode === "horizontal") {
        setValueToNode(node, "layoutSizingHorizontal", value, cache);
      }
      if (mode === "vertical") {
        setValueToNode(node, "layoutSizingVertical", value, cache);
      }
    }
  };

  return {
    ...node,
    layoutSizingHorizontal: getStableValue(
      node,
      "layoutSizingHorizontal",
      sizing.Fixed,
      cache
    ),
    layoutSizingVertical: getStableValue(
      node,
      "layoutSizingVertical",
      sizing.Fixed,
      cache
    ),
    setSizeMode,
    getAllowResizeHorizontal: () => {
      const sizing = getFieldValue(node, "layoutSizingHorizontal", cache);
      return ALLOW_SIZES.includes(sizing);
    },
    getAllowResizeVertical: () => {
      const sizing = getFieldValue(node, "layoutSizingVertical", cache);
      return ALLOW_SIZES.includes(sizing);
    },
  };
}
