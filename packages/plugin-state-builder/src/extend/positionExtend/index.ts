import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { isValue } from "@fragments/utils";

export const positionExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  return {
    ...graph,
    left: getValue("left", 0),
    top: getValue("top", 0),

    move(left: number, top: number) {
      if (isValue(left)) {
        valueSetter(state, graphKey, "left")(left);
      }
      if (isValue(top)) {
        valueSetter(state, graphKey, "top")(top);
      }
    },
  };
};
