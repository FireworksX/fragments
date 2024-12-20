import { nodes, variableType } from "@/definitions.ts";
import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { GraphState } from "@graph-state/core";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { base } from "next/dist/build/webpack/config/blocks/base";

export type CreateNumberOptions = Partial<{
  name: string;
  required: boolean;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  displayStepper: boolean;
}>;

export const createNumberVariable = (
  initialNode: Partial<unknown> = {},
  cache: GraphState
) => {
  const baseNode = createBaseVariableNode(
    {
      ...initialNode,
      defaultValue: initialNode?.defaultValue ?? 0,
    },
    cache
  );

  return {
    ...baseNode,
    type: variableType.Number,
    min: getSpringValue(baseNode, "min", 1, cache),
    max: getSpringValue(baseNode, "max", 100, cache),
    step: getSpringValue(baseNode, "step", 1, cache),
    displayStepper: getSpringValue(baseNode, "displayStepper", true, cache),

    setMin(value) {
      setValueToNode(baseNode, "min", value, cache);
    },
    setMax(value) {
      setValueToNode(baseNode, "max", value, cache);
    },
    setStep(value) {
      setValueToNode(baseNode, "step", value, cache);
    },
    setDisplayStepper(value) {
      setValueToNode(baseNode, "displayStepper", value, cache);
    },
  };
};
