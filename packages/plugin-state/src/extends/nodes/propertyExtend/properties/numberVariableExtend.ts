import { isValue } from "@fragments/utils";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { propertyType } from "@/definitions.ts";

export const numberVariableExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  return {
    ...graph,
    value: getValue("value", null),
    name: getValue("name", graph._id, false),
    required: getValue("required", false, false),
    type: propertyType.Number,
    defaultValue: getValue("defaultValue", 1),
    min: getValue("min", 1),
    max: getValue("max", 100),
    step: getValue("step", 1),
    displayStepper: getValue("displayStepper", true, false),

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
    setMin: valueSetter(state, graphKey, "min"),
    setMax: valueSetter(state, graphKey, "max"),
    setStep: valueSetter(state, graphKey, "step"),
    setDisplayStepper: valueSetter(state, graphKey, "displayStepper"),
  };
};
