import { isValue } from "@fragments/utils";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { variableType } from "@fragments/plugin-state";

export const stringVariableExtend: Extender = ({
  graphKey,
  graph,
  getValue,
  state,
}) => {
  return {
    ...graph,
    type: variableType.String,
    name: getValue("name", graph._id),
    value: getValue("value"),
    required: getValue("required", false),
    defaultValue: getValue("defaultValue", ""),
    placeholder: getValue("placeholder", null),
    displayTextArea: getValue("displayTextArea", false),

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
    setPlaceholder: valueSetter(state, graphKey, "placeholder"),
    setDisplayTextArea: valueSetter(state, graphKey, "displayTextArea"),
  };
};
