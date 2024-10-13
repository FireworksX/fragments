import { isValue } from "@fragments/utils";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { propertyType } from "@/definitions.ts";

export const booleanVariableExtend: Extender = ({
  graph,
  getValue,
  state,
  graphKey,
}) => {
  return {
    ...graph,
    value: getValue("value", null),
    name: getValue("name", graph._id),
    required: getValue("required", false),
    type: propertyType.Boolean,
    defaultValue: getValue("defaultValue", false),

    getValue: () => {
      const graph = state.resolve(graphKey);
      const value = graph.value;
      const defaultValue = graph.defaultValue;
      return isValue(value) ? value : defaultValue;
    },

    rename: (name) => {
      valueSetter(state, graphKey, "name")(name || graph._id);
    },
    setRequired: valueSetter(state, graphKey, "required"),
    setDefaultValue: valueSetter(state, graphKey, "defaultValue"),
  };
};
