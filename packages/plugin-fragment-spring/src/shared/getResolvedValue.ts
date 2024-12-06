import { Entity, GraphState } from "@graph-state/core";
import { isVariableLink } from "@/shared/isVariableLink.ts";

export const getResolvedValue = (input: Entity, cache: GraphState) => {
  if (isVariableLink(input)) {
    const variableValue = cache.resolve(input).getValue();
    return getResolvedValue(variableValue, cache);
  }

  return input;
};
