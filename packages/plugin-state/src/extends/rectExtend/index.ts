import { Extender } from "@/types";
import { fromProperties } from "@/shared/constraints/fromProperties.ts";
import { nodes } from "@/definitions.ts";

export const rectExtend: Extender = ({
  graph,
  graphKey,
  state,
  resolveField,
  getValue,
}) => {
  const rect = () => {
    const parentRect = state.resolve(graphKey)?.getParent()?.rect?.() ?? [];
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
    // Позиция относительно родителя
    rect,
    // Позиция относительно Breakpoint
    absoluteRect: () => {
      const allParents = (
        state.resolve(graphKey)?.getAllParents?.() ?? []
      ).filter((parent) => parent._type !== nodes.Breakpoint);

      return allParents.reduce((acc, parent) => {
        const parentRect = parent?.rect?.();
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
