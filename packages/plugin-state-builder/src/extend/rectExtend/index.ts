import { Extender } from "@/types";
import { fromProperties } from "@/shared/constraints/fromProperties.ts";
import { to } from "@react-spring/core";
import { animatableValue } from "@/shared/animatableValue.ts";
import { nodes } from "@fragments/plugin-state";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

const RECT_FIELD_KEYS = [
  "left",
  "top",
  "width",
  "height",
  "positionType",
  "layoutSizingHorizontal",
  "layoutSizingVertical",
];

export const rectExtend: Extender = ({
  graph,
  graphKey,
  state,
  resolveField,
}) => {
  const originalRectMethod = graph?.rect ?? (() => null);
  const originalAbsoluteRectMethod = graph?.absoluteRect ?? (() => null);
  const cachedRect = createCachedInterpolate();
  const cachedAbsoluteRect = createCachedInterpolate();

  const rect = () => {
    return cachedRect(RECT_FIELD_KEYS.map(resolveField), originalRectMethod);
  };

  const absoluteRect = () => {
    const targetRect = rect();
    const allParents = state.resolve(graphKey)?.getAllParents?.() ?? [];
    const allParentRects = allParents
      .map((parent) => parent?.rect?.())
      .filter(Boolean);

    return cachedAbsoluteRect(
      [targetRect, ...allParentRects],
      originalAbsoluteRectMethod
    );
  };

  return {
    ...graph,
    rect,
    absoluteRect,
  };
};
