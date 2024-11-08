import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { fragmentGrowingMode } from "@/definitions.ts";

export const fragmentGrowingExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  const horizontalGrowSetter = valueSetter(state, graphKey, "horizontalGrow");
  const verticalGrowSetter = valueSetter(state, graphKey, "verticalGrow");

  return {
    ...graph,
    horizontalGrow: getValue("horizontalGrow", fragmentGrowingMode.fixed),
    verticalGrow: getValue("verticalGrow", fragmentGrowingMode.fixed),
    setHorizontalGrow: horizontalGrowSetter,
    setVerticalGrow: verticalGrowSetter,
  };
};
