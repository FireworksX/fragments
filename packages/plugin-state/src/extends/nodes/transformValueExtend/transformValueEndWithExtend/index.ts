import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const transformValueEndWithExtend: Extender = ({
  graphKey,
  getValue,
  graph,
  state,
}) => {
  return {
    ...graph,
    value: getValue("value"),
    setValue: valueSetter(state, graphKey, "value"),
    transform: (inputValue): boolean => {
      return inputValue?.endWith(state.resolve(graphKey).value);
    },
  };
};
