import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { variableType } from "@/definitions.ts";

export const objectVariableExtend: Extender = ({
  graph,
  graphKey,
  getValue,
  state,
}) => {
  return {
    ...graph,
    type: variableType.Object,
    name: getValue("name", graph._id),
    required: getValue("required", false),
    fields: getValue("fields", []),

    rename: (name) => {
      valueSetter(state, graphKey, "name")(name || graph._id);
    },
    setRequired: valueSetter(state, graphKey, "required"),
    addField: valueSetter(state, graphKey, "fields"),
  };
};
