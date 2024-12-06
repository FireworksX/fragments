import { nodes, variableType } from "@/definitions.ts";
import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { GraphState } from "@graph-state/core";
import { getStableValue } from "@/shared/getStableValue.ts";
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
    required: getStableValue(baseNode, "required", false, cache),
    type: variableType.Number,
    min: getStableValue(baseNode, "min", 1, cache),
    max: getStableValue(baseNode, "max", 100, cache),
    step: getStableValue(baseNode, "step", 1, cache),
    displayStepper: getStableValue(baseNode, "displayStepper", true, cache),

    setRequired(value) {
      setValueToNode(baseNode, "required", value, cache);
    },
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
