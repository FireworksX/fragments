import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { positionType } from "@/definitions.ts";

export const positionExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  return {
    ...graph,
    left: getValue("left"),
    top: getValue("top"),
    positionType: getValue("positionType", positionType.absolute),
    setPositionType: valueSetter(state, graphKey, "positionType"),

    move(left: number, top: number) {
      if (left) {
        valueSetter(state, graphKey, "left")(left);
      }
      if (top) {
        valueSetter(state, graphKey, "top")(top);
      }
    },
  };
};

positionExtend.symbol = Symbol("positionExtend");
