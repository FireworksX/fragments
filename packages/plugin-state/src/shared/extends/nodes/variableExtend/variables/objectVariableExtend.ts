import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { variableType } from "@/defenitions.ts";

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

    rename: valueSetter(state, graphKey, "name"),
    setRequired: valueSetter(state, graphKey, "required"),
    addField: valueSetter(state, graphKey, "fields"),
  };
};
