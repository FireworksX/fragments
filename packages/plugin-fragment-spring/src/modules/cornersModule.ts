import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringCorners } from "@/types";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { stringifyCssSpacing } from "@/shared/cssSpacingParser.ts";
import { toPx } from "@/shared/pxFormat.ts";

export function cornersModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringCorners<T> {
  return {
    ...node,
    cornerRadius: getSpringValue(node, "cornerRadius", "0px", cache),
    setCornerRadius(value) {
      if (typeof value === "number") {
        setValueToNode(node, "cornerRadius", toPx(value), cache);
      }

      if (typeof value === "object" && "top" in value) {
        setValueToNode(node, "cornerRadius", stringifyCssSpacing(value), cache);
      }

      if (typeof value === "string") {
        setValueToNode(node, "cornerRadius", value, cache);
      }
    },
  };
}
