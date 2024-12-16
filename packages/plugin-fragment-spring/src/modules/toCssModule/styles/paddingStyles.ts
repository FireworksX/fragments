import { GraphState } from "@graph-state/core";
import { getFieldValue, toPx } from "@fragments/plugin-fragment";

export const paddingStyles = (node, cache: GraphState) => {
  const padding = getFieldValue(node, "padding", cache);

  return {
    padding,
  };
};
