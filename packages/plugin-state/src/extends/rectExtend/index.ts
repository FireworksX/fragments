import { Extender } from "@/types";
import { animatableValue } from "@/shared/animatableValue.ts";

export const rectExtend: Extender = ({ graph, graphKey, state, getValue }) => {
  const rect = () => {
    const parentRect =
      animatableValue(state.resolve(graphKey)?.getParent()?.rect?.()) ?? {};
    const constraintValues = state.constraints.fromProperties(graph);

    return state.constraints.toRect(
      constraintValues,
      parentRect,
      null,
      graphKey
    );
  };

  return {
    ...graph,
    rect,
    // Позиция относительно Breakpoint
    absoluteRect: () => {
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
    },
  };
};
