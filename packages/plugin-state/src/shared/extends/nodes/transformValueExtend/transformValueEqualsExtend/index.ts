import { Extender } from "@/types";
import { getResolvedValue } from "@/shared/utils/getResolvedValue.ts";
import { valueSetter } from "@/shared/valueSetter.ts";

export const transformValueEqualsExtend: Extender = ({
  graph,
  getValue,
  graphKey,
  state,
}) => {
  return {
    ...graph,
    value: getValue("value"),
    setValue: valueSetter(state, graphKey, "value"),
    transform: (inputValue): boolean => {
      const value = getResolvedValue(state, state.resolve(graphKey).value);
      return value === inputValue;
    },
  };
};
