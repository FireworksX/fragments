import { GraphState } from "@graph-state/core";
import { BaseNode, WithCorners } from "@/types";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { isValue } from "@fragments/utils";
import { getFieldValue } from "@/shared/getFieldValue.ts";

export function cornersModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithCorners<T> {
  const isMixedRadius = () =>
    !isValue(getFieldValue(node, "cornerRadius", cache));

  const setRadius = (fieldKey: string, value: number | null) => {
    setValueToNode(node, fieldKey, value, cache);
  };

  return {
    ...node,
    cornerRadius: getStableValue(node, "cornerRadius", 0, cache),
    topLeftRadius: getStableValue(node, "topLeftRadius", 0, cache),
    topRightRadius: getStableValue(node, "topRightRadius", 0, cache),
    bottomLeftRadius: getStableValue(node, "bottomLeftRadius", 0, cache),
    bottomRightRadius: getStableValue(node, "bottomRightRadius", 0, cache),
    isMixedRadius,

    setCornerRadius(...args) {
      const isSide = args.length > 1;
      const side = isSide ? args[0] : undefined;
      const value = isSide ? args[1] : args[0];

      if (isSide) {
        setRadius("cornerRadius", null);
        const fieldKeyMap = {
          tl: "topLeftRadius",
          tr: "topRightRadius",
          bl: "bottomLeftRadius",
          br: "bottomRightRadius",
        };
        setRadius(fieldKeyMap[side], value);
      } else {
        setRadius("cornerRadius", value);
      }
    },
  };
}
