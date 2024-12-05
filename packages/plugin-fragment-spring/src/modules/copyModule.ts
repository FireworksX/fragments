import { GraphState, LinkKey } from "@graph-state/core";
import { BaseNode, WithChildren } from "@/types";
import { generateId } from "@fragments/utils";
import { createNode } from "@/shared/createNode.ts";
import { toJsonNode } from "@/shared/toJsonNode.ts";

export function copyModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithChildren<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    copy() {
      const node = toJsonNode(cache.resolve(nodeKey) ?? {});
      const nextChildren =
        node?.children?.map((child) => child.copy?.() ?? child) ?? [];

      const nextEntity = createNode(
        {
          ...node,
          _type: node._type,
          _id: generateId(),
          children: nextChildren,
        },
        cache
      );

      return cache.mutate(nextEntity);
    },
  };
}
