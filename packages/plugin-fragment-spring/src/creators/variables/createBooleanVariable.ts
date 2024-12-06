import { GraphState } from "@graph-state/core";
import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { variableType } from "@fragments/plugin-fragment";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export type CreateBooleanOptions = Partial<{
  required: boolean;
  name: string;
  defaultValue: boolean;
}>;

export function createBooleanVariable(
  initialNode: Partial<unknown> = {},
  cache: GraphState
) {
  const baseNode = createBaseVariableNode(
    {
      ...initialNode,
      defaultValue: initialNode?.defaultValue ?? false,
    },
    cache
  );

  return {
    ...baseNode,
    required: getStableValue(baseNode, "required", false, cache),
    type: variableType.Boolean,
    setRequired(value) {
      setValueToNode(baseNode, "required", value, cache);
    },
  };
}
