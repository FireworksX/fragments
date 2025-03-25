import { GraphState } from "@graph-state/core";
import { FrameNode } from "@/types";
import { createFrameNode } from "@/creators/createFrameNode.ts";

export function createBreakpointNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const frameNode = createFrameNode(initialNode, cache);

  return frameNode;
}
