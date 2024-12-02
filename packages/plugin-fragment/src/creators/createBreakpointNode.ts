import { createBaseNode } from "@/creators/createBaseNode.ts";
import { nodes } from "@/definitions.ts";
import { applyModules } from "@/shared/applyModules.ts";
import { GraphState } from "@graph-state/core";
import { FrameNode } from "@/types";
import { modules as frameModules } from "@/creators/createFrameNode.ts";
import { getStableValue } from "@/shared/getStableValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function createBreakpointNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Breakpoint, initialNode, cache);
  const breakpointNode = applyModules(baseNode, frameModules, cache);

  return {
    ...breakpointNode,
    threshold: getStableValue(breakpointNode, "threshold", 320, cache),
    setThreshold: (threshold: number) =>
      setValueToNode(breakpointNode, "threshold", threshold, cache),
  };
}
