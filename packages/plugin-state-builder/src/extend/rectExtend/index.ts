import { Extender } from "@/types";
import { fromProperties } from "@/shared/constraints/fromProperties.ts";
import { to } from "@react-spring/core";
import { animatableValue } from "@/shared/animatableValue.ts";
import { nodes } from "@fragments/plugin-state";

export const rectExtend: Extender = ({
  graph,
  graphKey,
  state,
  resolveField,
}) => {
  let rectInterpolate = null;
  let absoluteRectInterpolate = null;
  let parentsKey = "";
  let rectCacheKey = "";
  const rectFieldKeys = [
    "left",
    "top",
    "width",
    "height",
    "layoutSizingHorizontal",
    "layoutSizingVertical",
  ];

  const rect = () => {
    const rectValues = rectFieldKeys.map(resolveField);
    const nextCacheKey = rectValues
      .filter(Boolean)
      .map((v) => v.id)
      .join("_");

    if (rectInterpolate && nextCacheKey === rectCacheKey)
      return rectInterpolate;

    rectCacheKey = nextCacheKey;

    rectInterpolate = to(rectValues, (l, t) => {
      const parentRect =
        animatableValue(state.resolve(graphKey)?.getParent()?.rect?.()) ?? {};
      const constraintValues = state.constraints.fromProperties(graph);

      const rect = state.constraints.toRect(
        constraintValues,
        parentRect,
        null,
        graphKey
      );

      return rect;
    });

    return rectInterpolate;
  };

  const absoluteRect = () => {
    const targetRect = rect();
    const allParents = state.resolve(graphKey)?.getAllParents?.() ?? [];
    const parentsCacheKey = allParents
      .map((p) => p._id)
      .concat(targetRect?.id)
      .join("_");

    if (absoluteRectInterpolate && parentsKey === parentsCacheKey)
      return absoluteRectInterpolate;

    const allParentRects = allParents
      .map((parent) => parent?.rect?.())
      .filter(Boolean);

    parentsKey = parentsCacheKey;
    absoluteRectInterpolate = to([targetRect, ...allParentRects], () => {
      return allParents.reduce((acc, parent) => {
        const parentRect = animatableValue(parent?.rect?.());
        return parentRect
          ? {
              ...acc,
              x: acc.x + parentRect.x,
              y: acc.y + parentRect.y,
            }
          : acc;
      }, state.rect.fromAny(animatableValue(targetRect)));
    });

    return absoluteRectInterpolate;
  };

  return {
    ...graph,
    // Позиция относительно родителя
    rect,
    // Позиция относительно Breakpoint
    absoluteRect,
  };
};
