import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const transformValueStartWithExtend: Extender = ({
  graph,
  getValue,
  state,
  graphKey,
}) => {
  return {
    ...graph,
    value: getValue("value"),
    setValue: valueSetter(state, graphKey, "value"),
    transform: (inputValue): boolean => {
      return inputValue?.startWith(state.resolve(graphKey).value);
    },
  };
};
