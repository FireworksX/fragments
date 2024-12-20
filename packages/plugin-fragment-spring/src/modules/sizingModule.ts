import { sizing } from "@/definitions.ts";
import { BaseNode, WithSpringSizing } from "@/types";
import { GraphState } from "@graph-state/core";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";
import { getFieldValue } from "@fragments/plugin-fragment";

const ALLOW_SIZES = [sizing.Fixed, sizing.Relative];

export function sizingModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringSizing<T> {
  const horizontalInterpolate = createCachedInterpolate();
  const verticalInterpolate = createCachedInterpolate();

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
    layoutSizingHorizontal: getSpringValue(
      node,
      "layoutSizingHorizontal",
      sizing.Fixed,
      cache
    ),
    layoutSizingVertical: getSpringValue(
      node,
      "layoutSizingVertical",
      sizing.Fixed,
      cache
    ),
    setSizeMode,
    getAllowResizeHorizontal: () => {
      const sizing = getFieldValue(node, "layoutSizingHorizontal", cache);
      return horizontalInterpolate([sizing], (v) => {
        return ALLOW_SIZES.includes(v);
      });
    },
    getAllowResizeVertical: () => {
      const sizing = getFieldValue(node, "layoutSizingVertical", cache);
      return verticalInterpolate([sizing], (v) => {
        return ALLOW_SIZES.includes(v);
      });
    },
  };
}
