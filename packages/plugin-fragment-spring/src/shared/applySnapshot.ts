import {
  GraphState,
  isGraph,
  isPartialKey,
  isPartOfGraph,
} from "@graph-state/core";
import { createNode } from "@/shared/createNode.ts";

export function applySnapshot(cache: GraphState, snapshot: {}) {
  if (!snapshot) return;

  Object.values(snapshot).forEach((item) => {
    if (isGraph(item) && !isPartialKey(cache.keyOfEntity(item))) {
      item = createNode(item, cache);
    }

    cache.mutate(item);
  });
}
