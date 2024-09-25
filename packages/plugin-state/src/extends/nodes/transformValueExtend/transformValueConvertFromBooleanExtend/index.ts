import { Extender } from "@/types";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";
import { valueSetter } from "@/shared/valueSetter.ts";

export const convertFromBooleanTransformValueExtend: Extender = ({
  getValue,
  graphKey,
  graph,
  state,
}) => {
  return {
    ...graph,
    truthy: getValue("truthy"),
    falsy: getValue("falsy"),
    setTruthy: valueSetter(state, graphKey, "truthy"),
    setFalsy: valueSetter(state, graphKey, "falsy"),
    transform: (inputValue: boolean): unknown => {
      const node = state.resolve(graphKey);
      return inputValue
        ? getResolvedValue(state, node.truthy)
        : getResolvedValue(state, node.falsy);
    },
  };
};
