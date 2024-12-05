import { GraphState, LinkKey } from "@graph-state/core";
import { BaseNode, WithChildren } from "@/types";
import { generateId } from "@fragments/utils";
import { createNode } from "@/shared/createNode.ts";

export function copyModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithChildren<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    copy() {
      const node = cache.resolve(nodeKey) ?? {};
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

      const copyKey = cache.mutate(nextEntity);

      return copyKey;
    },
  };
}
