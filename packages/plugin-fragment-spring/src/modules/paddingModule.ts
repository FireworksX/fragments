import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringPadding } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import {
  parseCssSpacing,
  stringifyCssSpacing,
} from "@/shared/cssSpacingParser.ts";
import { toPx } from "@/shared/pxFormat.ts";

export function paddingModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringPadding<T> {
  return {
    ...node,
    padding: getStableValue(node, "padding", "0px", cache),

    setPadding(value) {
      if (typeof value === "number") {
        setValueToNode(node, "padding", toPx(value), cache);
      }

      if (typeof value === "object" && "top" in value) {
        setValueToNode(node, "padding", stringifyCssSpacing(value), cache);
      }

      if (typeof value === "string") {
        setValueToNode(node, "padding", value, cache);
      }
    },
  };
}
