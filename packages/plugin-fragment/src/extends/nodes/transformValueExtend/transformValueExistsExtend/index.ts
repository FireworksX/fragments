import { isValue } from "@fragments/utils";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const transformValueExistsExtend: Extender = ({
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
      return isValue(inputValue);
    },
  };
};
