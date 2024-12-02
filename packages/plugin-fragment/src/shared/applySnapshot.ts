import { GraphState, isGraph } from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { createFrameNode } from "@/creators/createFrameNode.ts";

export function applySnapshot(cache: GraphState, snapshot: unknown[]) {
  if (!snapshot) return;

  snapshot.forEach((item) => {
    if (isGraph(item)) {
      if (item._type === nodes.Frame) {
        item = createFrameNode(item, cache);
      }
    }

    cache.mutate(item);
  });
}
