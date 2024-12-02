import { BaseNode, WithAspectRatio, WithSizing } from "@/types";
import { GraphState } from "@graph-state/core";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { isValue } from "@fragments/utils";
import { getFieldValue } from "@/shared/getFieldValue.ts";

export function sizingModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithAspectRatio<T> {
  const isSynced = () => isValue(getFieldValue(node, "aspectRatio", cache));

  const syncSize = () => {
    const width = getFieldValue(node, "width", cache);
    const height = getFieldValue(node, "height", cache);
    const nextValue = !isSynced() ? height / width : null;

    setValueToNode(node, "aspectRatio", nextValue, cache);
  };

  return {
    aspectRatio: getStableValue(node, "aspectRatio", null, cache),
    isSynced,
    syncSize,
  };
}
