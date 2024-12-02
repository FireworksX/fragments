import { GraphState } from "@graph-state/core";
import { BaseNode, WithCorners, WithPadding } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { isValue } from "@fragments/utils";
import { getFieldValue } from "@/shared/getFieldValue.ts";

export function paddingModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithPadding<T> {
  const isMixedPadding = () => !isValue(getFieldValue(node, "padding", cache));

  const setPadding = (fieldKey: string, value: number | null) =>
    setValueToNode(node, fieldKey, value, cache);

  return {
    ...node,
    padding: getStableValue(node, "padding", 0, cache),
    paddingLeft: getStableValue(node, "paddingLeft", 0, cache),
    paddingRight: getStableValue(node, "paddingRight", 0, cache),
    paddingTop: getStableValue(node, "paddingTop", 0, cache),
    paddingBottom: getStableValue(node, "paddingBottom", 0, cache),
    isMixedPadding,

    setPadding(...args) {
      const isSide = args.length > 1;
      const side = isSide ? args[0] : undefined;
      const value = isSide ? args[1] : args[0];

      if (isSide) {
        setPadding("padding", null);
        const fieldKeyMap = {
          top: "paddingTop",
          right: "paddingRight",
          bottom: "paddingBottom",
          left: "paddingLeft",
        };
        setPadding(fieldKeyMap[side], value);
      } else {
        setPadding("padding", value);
      }
    },
  };
}
