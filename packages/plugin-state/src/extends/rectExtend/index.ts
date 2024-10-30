import { Extender } from "@/types";
import { animatableValue } from "@/shared/animatableValue.ts";

export const rectExtend: Extender = ({ graph, graphKey, state, getValue }) => {
  const rect = () => {
    const parentRect =
      animatableValue(state.resolve(graphKey)?.getParent()?.rect?.()) ?? {};
    const constraintValues = state.constraints.fromProperties(graph);

    return state.constraints.toRect({
      values: constraintValues,
      parentRect,
      layerKey: graphKey,
    });
  };

  const absoluteRect = () => {
    const allParents = state.resolve(graphKey)?.getAllParents?.() ?? [];

    return allParents.reduce((acc, parent) => {
      const parentRect = animatableValue(parent?.rect?.());
      return parentRect
        ? {
            ...acc,
            x: acc.x + parentRect.x,
            y: acc.y + parentRect.y,
          }
        : acc;
    }, state.rect.fromAny(rect()));
  };

  return {
    ...graph,
    rect,
    // Позиция относительно Breakpoint
    absoluteRect,
  };
};
