import { Plugin } from "@graph-state/core";
import { toRect } from "@/shared/constraints/toRect.ts";
import { fromProperties } from "@/shared/constraints/fromProperties.ts";
import { toSize } from "@/shared/constraints/toSize.ts";

export const constraintsStatic: Plugin = (state) => {
  state.constraints = {
    toRect: (ctx) => toRect({ ...ctx, state }),
    fromProperties: (graph) => fromProperties(state, graph),
    toSize,
  };
};
