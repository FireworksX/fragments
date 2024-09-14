import { Extender, ExtenderPayload } from "@/types";
import { fromProperties } from "@/shared/constraints/fromProperties.ts";
import { to } from "@react-spring/core";
import { toRect } from "@/shared/constraints/toRect.ts";

export const rect: Extender = ({
  state,
  graph,
  graphKey,
  getValue,
}: ExtenderPayload<unknown>) => {
  return {
    ...graph,
    rect: to([], () => {
      const parent = state.resolve(graphKey).getParent();
      const constraintValues = fromProperties(graph);
      const parentSizeInfo = props.parentSize
        ? {
            sizing: props.parentSize,
            positioning: props.parentSize,
            viewport: null,
          }
        : null;
      return toRect(constraintValues, parentSizeInfo, null, true);
    }),
  };
};
