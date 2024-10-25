import { isValue } from "@fragments/utils";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

export const numberVariableExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  const cachedValue = createCachedInterpolate();

  return {
    ...graph,
    value: getValue("value", null),
    defaultValue: getValue("defaultValue", 1),

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
