import { Extender } from "@/types";
import { fromProperties } from "@/shared/constraints/fromProperties.ts";
import { to } from "@react-spring/core";
import { animatableValue } from "@/shared/animatableValue.ts";

export const rectExtend: Extender = ({ graph, graphKey, state }) => {
  let rectInterpolate = null;
  let absoluteRectInterpolate = null;
  let parentsKey = "";

  const rect = () => {
    if (rectInterpolate) return rectInterpolate;

    const {
      left,
      top,
      width,
      height,
      layoutSizingHorizontal,
      layoutSizingVertical,
    } = state.resolve(graphKey) ?? {};

    rectInterpolate = to(
      [left, top, width, height, layoutSizingHorizontal, layoutSizingVertical],
      () => {
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
      }
    );

    return rectInterpolate;
  };

  const absoluteRect = () => {
    const allParents = state.resolve(graphKey)?.getAllParents?.() ?? [];
    const parentsCacheKey = allParents.map((p) => p._id).join("_");

    if (absoluteRectInterpolate && parentsKey === parentsCacheKey)
      return absoluteRectInterpolate;

    const allParentRects = allParents
      .map((parent) => parent?.rect?.())
      .filter(Boolean);
    const targetRect = rect();

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
