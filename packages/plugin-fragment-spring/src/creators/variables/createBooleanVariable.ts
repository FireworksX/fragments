import { GraphState } from "@graph-state/core";
import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { variableType } from "@fragments/plugin-fragment";
import { getSpringValue } from "@/shared/getSpringValue.ts";
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
    type: variableType.Boolean,
  };
}
