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

  const node: BaseNode = {
    ...initialNode,
    _type: type,
    _id: id,
    name: initialNode?.name,
    overrides: initialNode?.overrides ?? [],
    children: initialNode?.children ?? [],
    parent: initialNode?.parent ?? undefined,

    getParent: () => {
      const resolvedNode = cache.resolve({ _type: type, _id: id });

      if (resolvedNode) {
        return cache.resolve(getKey(resolvedNode.parent));
      }

      return null;
    },

    getAllParents(stack = []) {
      const node = cache.resolve({ _type: type, _id: id });
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
      cache.invalidate({ _type: type, _id: id });
    },
  };

  return node;
}
