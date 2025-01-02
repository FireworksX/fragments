import { BaseNode } from "@/types";
import { generateId } from "@fragments/utils";
import { GraphState } from "@graph-state/core";
import { getKey } from "@/shared";
import { nodes } from "@/definitions.ts";

export function createBaseNode(
  type: string,
  initialNode: Partial<BaseNode>,
  cache: GraphState
): BaseNode {
  const id = initialNode?._id ?? generateId();
  const nodeKey = cache.keyOfEntity({ _type: type, _id: id });

  const node: BaseNode = {
    ...initialNode,
    _type: type,
    _id: id,
    name: initialNode?.name,
    overrides: initialNode?.overrides ?? [],
    children: initialNode?.children ?? [],
    // parent: initialNode?.parent ?? null,

    getParent: () => {
      const cacheParents = cache.resolveParents(nodeKey);
      const cacheParent = cacheParents.find((parent) =>
        parent?.children?.includes(nodeKey)
      );

      if (cacheParent) {
        return cache.resolve(cacheParent);
      }

      return null;
    },

    getAllParents(stack = []) {
      const node = cache.resolve(nodeKey);
      const parent = node.getParent();

      if (parent) {
        stack.push(parent);
        parent.getAllParents(stack);
      }

      return stack;
    },

    rename(name: string) {
      cache.mutate({
        _type: type,
        _id: id,
        name,
      });
    },

    remove() {
      cache.invalidate(nodeKey);
    },
  };

  return node;
}
