import {
  GraphState,
  isGraph,
  isPartialKey,
  isPartOfGraph,
} from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { createBreakpointNode, variableType } from "@fragments/plugin-fragment";
import { createFragmentNode } from "@/creators/createFragmentNode.ts";
import { createTextNode } from "@/creators/createTextNode.ts";
import { createNumberVariable } from "@/creators/variables/createNumberVariable.ts";
import { createBooleanVariable } from "@/creators/variables/createBooleanVariable.ts";
import { createStringVariable } from "@/creators/variables/createStringVariable.ts";
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
