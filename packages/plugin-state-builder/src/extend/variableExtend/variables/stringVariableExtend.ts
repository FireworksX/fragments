import { isValue } from "@fragments/utils";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

export const stringVariableExtend: Extender = ({
  graphKey,
  graph,
  getValue,
  state,
}) => {
  const cachedValue = createCachedInterpolate();

  return {
    ...graph,
    value: getValue("value"),
    defaultValue: getValue("defaultValue", ""),

    getValue: () => {
      const graph = state.resolve(graphKey);
      const value = graph.value;
      const defaultValue = graph.defaultValue;

      return cachedValue([value, defaultValue], (val, defValue) =>
        isValue(val) ? val : defValue
      );
    },

    setDefaultValue: valueSetter(state, graphKey, "defaultValue"),
  };
};
