import { GraphState, LinkKey } from "@graph-state/core";
import { BaseNode, WithChildren } from "@/types";
import { setKey } from "@/shared";
import { generateId } from "@fragments/utils";
import { createNode } from "@/shared/createNode.ts";

export function cloneModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithChildren<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    overrides: node?.overrides ?? [],
    clone(overrideNode: BaseNode) {
      const node = cache.resolve(nodeKey);
      const nextChildren =
        node?.children?.map((child) => child.clone?.() ?? child) ?? [];

      const nextEntity = createNode(
        {
          ...(overrideNode ?? {}),
          overrideFrom: nodeKey,
          _type: node._type,
          _id: generateId(),
          children: nextChildren,
        },
        cache
      );

      const cloneKey = cache.mutate(nextEntity);
      cache.mutate(nodeKey, {
        overrides: [setKey(cloneKey)],
      });

      return cloneKey;
    },
  };
}
