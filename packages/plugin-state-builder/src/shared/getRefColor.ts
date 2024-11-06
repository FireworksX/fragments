import { nodes } from "@fragments/plugin-state";
import { Interpolation } from "@react-spring/web";
import { GraphState } from "@graph-state/core";

export const getRefColor = (state: GraphState, color: unknown) => {
  const resolveValue = state?.resolve?.(color);
  const variableValue =
    resolveValue?._type === nodes.SolidPaintStyle ? resolveValue?.color : color;
  const resultColor = variableValue ?? color;

  return resultColor instanceof Interpolation ? resultColor : resultColor; // displayColorInterpolate(resultColor)
};
