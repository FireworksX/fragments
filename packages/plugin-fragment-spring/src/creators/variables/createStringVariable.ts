import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { GraphState } from "@graph-state/core";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { variableType } from "@fragments/plugin-fragment";

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
    type: variableType.String,
    placeholder: getSpringValue(baseNode, "placeholder", null, cache),
    isTextarea: getSpringValue(baseNode, "isTextarea", false, cache),

    setPlaceholder(value) {
      setValueToNode(baseNode, "placeholder", value, cache);
    },
    setIsTextarea(value) {
      setValueToNode(baseNode, "isTextarea", value, cache);
    },
  };
};
