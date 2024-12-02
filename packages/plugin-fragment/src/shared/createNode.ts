import { BaseNode } from "@/types";
import { GraphState, LinkKey } from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { createFrameNode } from "@/creators/createFrameNode.ts";

export function createNode(
  initialNode: Partial<BaseNode>,
  cache: GraphState,
  appendTo?: LinkKey,
) {
  if (!initialNode) return null;

  const node = {
    [nodes.Frame]: createFrameNode,
  }[initialNode._type](initialNode, cache);

  if (appendTo) {
    const parentNode = cache.resolve(appendTo);
    parentNode?.appendChild?.(node);
  }

  return node;
}
