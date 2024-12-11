import { nodes, variableType } from "@/definitions.ts";
import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { GraphState } from "@graph-state/core";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export type CreateNumberOptions = Partial<{
  name: string;
  required: boolean;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  displayStepper: boolean;
}>;

export const createStringVariable = (
  initialNode: Partial<unknown> = {},
  cache: GraphState
) => {
  const baseNode = createBaseVariableNode(
    {
      ...initialNode,
      defaultValue: initialNode?.defaultValue ?? "",
    },
    cache,
    {
      staticDefaultValue: true,
    }
  );

  return {
    ...baseNode,
    required: getStableValue(baseNode, "required", false, cache),
    type: variableType.String,
    placeholder: getStableValue(baseNode, "placeholder", null, cache),
    isTextarea: getStableValue(baseNode, "isTextarea", false, cache),

    setRequired(value) {
      setValueToNode(baseNode, "required", value, cache);
    },
    setPlaceholder(value) {
      setValueToNode(baseNode, "placeholder", value, cache);
    },
    setIsTextarea(value) {
      setValueToNode(baseNode, "isTextarea", value, cache);
    },
  };
};
