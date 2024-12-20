import { isValue } from "@fragments/utils";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getFieldValue } from "@fragments/plugin-fragment";
import { BaseNode, WithSpringAspectRatio } from "@/types";
import { GraphState } from "@graph-state/core";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";
import { animatableValue } from "@/shared/animatableValue.ts";

export const aspectRatioModule = <T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringAspectRatio<T> => {
  const cachedIsSynced = createCachedInterpolate();

  const isSynced = () => {
    return cachedIsSynced([getFieldValue(node, "aspectRatio", cache)], isValue);
  };

  const syncSize = () => {
    const width = animatableValue(getFieldValue(node, "width", cache));
    const height = animatableValue(getFieldValue(node, "height", cache));
    const nextValue = !animatableValue(isSynced()) ? height / width : null;

    setValueToNode(node, "aspectRatio", nextValue, cache);
  };

  return {
    ...node,
    aspectRatio: getSpringValue(node, "aspectRatio", null, cache),
    isSynced,
    syncSize,
  };
};
