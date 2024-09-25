import { Extender, ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { isFiniteNumber } from "@fragments/utils";
import { valueToDimensionType } from "@fragments/utils/src/valueToDimensionType.ts";

export const constraintExtend: Extender = ({
  state,
  graph,
  graphKey,
  getValue,
}: ExtenderPayload<unknown>) => {
  return {
    ...graph,
    constraints: {},
  };
};
