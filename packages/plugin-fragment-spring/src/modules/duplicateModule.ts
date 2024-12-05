import { GraphState, LinkKey } from "@graph-state/core";
import { BaseNode, WithChildren } from "@/types";

export function duplicateModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithChildren<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    duplicate() {
      const node = cache.resolve(nodeKey) ?? {};

      if ("copy" in node) {
        const nodeCopy = node.copy();
        const parent = node.getParent();

        if (parent) {
          parent.appendChild(nodeCopy);
        }

        return nodeCopy;
      } else {
        console.error("DuplicateModule work only with copyModule.");
      }
    },
  };
}
