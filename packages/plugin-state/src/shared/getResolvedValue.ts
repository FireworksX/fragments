import { Entity, GraphState } from "@graph-state/core";
import { isVariableLink } from "@/shared/isVariableLink.ts";

export const getResolvedValue = (state: GraphState, input: Entity) => {
  if (isVariableLink(input)) {
    const variableValue = state.resolve(input).getValue();
    return getResolvedValue(state, variableValue);
  }

  return input;
};
