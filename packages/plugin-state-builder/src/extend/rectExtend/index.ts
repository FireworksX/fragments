import { Extender } from "@/types";
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
    const parentRect = state.resolve(graphKey)?.getParent?.()?.rect();
    return cachedRect(
      RECT_FIELD_KEYS.map(resolveField).concat(parentRect),
      originalRectMethod
    );
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
