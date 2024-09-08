import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const positionExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  return {
    ...graph,
    x: getValue("x"),
    y: getValue("y"),
    positionType: getValue("positionType"),
    setPositionType: valueSetter(state, graphKey, "positionType"),

    move(
      x: number | ((prev: number) => number),
      y: number | ((prev: number) => number)
    ) {
      if (x) {
        const resValue = typeof x === "function" ? x(getValue("x")) : x;
        valueSetter(state, graphKey, "x")(resValue);
      }
      if (y) {
        const resValue = typeof y === "function" ? y(getValue("y")) : y;
        valueSetter(state, graphKey, "y")(resValue);
      }
    },
  };
};
