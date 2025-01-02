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
    getOverrideFrom() {
      const cacheParents = cache.resolveParents(nodeKey);
      return cacheParents.find((parent) => parent.overrides?.includes(nodeKey));
    },
    clone(overrideNode: BaseNode) {
      const node = cache.resolve(nodeKey);
      const nextChildren =
        node?.children?.map(
          (child) => cache.resolve(child)?.clone?.() ?? child
        ) ?? [];

      const nextId = generateId();
      const nextKey = cache.keyOfEntity({ _type: node._type, _id: nextId });

      /**
       * Сначала создаём связь parent-children в graphState
       * чтобы когда создавалась нода createNode()
       * поля знали что есть родитель и нужно использовать override
       */
      cache.mutate(nodeKey, {
        overrides: [nextKey],
      });

      const nextEntity = createNode(
        {
          ...(overrideNode ?? {}),
          _type: node._type,
          _id: nextId,
          children: nextChildren,
        },
        cache
      );

      // const cloneKey = cache.mutate(nextEntity);
      cache.mutate(nextEntity);

      return nextKey;
    },
  };
}
