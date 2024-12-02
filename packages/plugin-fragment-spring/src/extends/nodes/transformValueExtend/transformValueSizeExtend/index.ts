import { Extender } from "@/types";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";
import { valueSetter } from "@/shared/valueSetter.ts";

type Mode = "gt" | "gte" | "lt" | "lte";

export const transformValueValueSizeExtend =
  (mode: Mode): Extender =>
  ({ getValue, state, graph, graphKey }) => {
    return {
      ...graph,
      value: getValue("value"),
      setValue: valueSetter(state, graphKey, "value"),
      transform: (inputValue): boolean => {
        const value = getResolvedValue(state, state.resolve(graphKey).value);
        if (mode === "gt") return inputValue > value;
        if (mode === "gte") return inputValue >= value;
        if (mode === "lt") return inputValue < value;
        if (mode === "lte") return inputValue <= value;

        return false;
      },
    };
  };
