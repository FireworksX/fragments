import { GraphState } from "@graph-state/core";
import { BaseNode, WithSpringCorners } from "@/types";
import { getStaticValue } from "@/shared/getStaticValue.ts";

export function linkModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringCorners<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    href: getStaticValue(node, "href", null, cache),
    target: getStaticValue(node, "target", null, cache),

    setHref(value) {
      cache.mutate(nodeKey, {
        href: value,
      });
    },

    setTarget(value) {
      cache.mutate(nodeKey, {
        target: value,
      });
    },
  };
}
