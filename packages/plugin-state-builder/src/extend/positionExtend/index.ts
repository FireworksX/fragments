import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { animatableValue } from "@/shared/animatableValue.ts";

export const positionExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  return {
    ...graph,
    x: getValue("x", 0),
    y: getValue("y", 0),

    move(
      x: number | ((prev: number) => number),
      y: number | ((prev: number) => number)
    ) {
      const { x: currentX, y: currentY } = state.resolve(graphKey);
      if (x) {
        const resValue =
          typeof x === "function" ? x(animatableValue(currentX)) : x;

        valueSetter(state, graphKey, "x")(resValue);
      }
      if (y) {
        const resValue =
          typeof y === "function" ? y(animatableValue(currentY)) : y;
        valueSetter(state, graphKey, "y")(resValue);
      }
    },
  };
};
