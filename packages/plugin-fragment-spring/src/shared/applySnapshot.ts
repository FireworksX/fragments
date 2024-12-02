import { GraphState, isGraph } from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { createBreakpointNode } from "@fragments/plugin-fragment";
import { createFragmentNode } from "@/creators/createFragmentNode.ts";

export function applySnapshot(cache: GraphState, snapshot: unknown[]) {
  if (!snapshot) return;

  snapshot.forEach((item) => {
    if (isGraph(item)) {
      if (item._type === nodes.Frame) {
        item = createFrameNode(item, cache);
      }
      if (item._type === nodes.Breakpoint) {
        item = createBreakpointNode(item, cache);
      }
      if (item._type === nodes.Fragment) {
        item = createFragmentNode(item, cache);
      }
    }

    cache.mutate(item);
  });
}
