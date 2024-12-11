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

export function applySnapshot(cache: GraphState, snapshot: {}) {
  if (!snapshot) return;

  Object.values(snapshot).forEach((item) => {
    if (isGraph(item) && !isPartialKey(cache.keyOfEntity(item))) {
      if (item._type === nodes.Frame) {
        item = createFrameNode(item, cache);
      }
      if (item._type === nodes.Breakpoint) {
        item = createBreakpointNode(item, cache);
      }
      if (item._type === nodes.Fragment) {
        item = createFragmentNode(item, cache);
      }
      if (item._type === nodes.Text) {
        item = createTextNode(item, cache);
      }
      if (item._type === nodes.Variable && !!item.type) {
        const creatorsMethodsMap = {
          [variableType.Number]: createNumberVariable,
          [variableType.Boolean]: createBooleanVariable,
          [variableType.String]: createStringVariable,
        };

        if (item.type in creatorsMethodsMap) {
          item = creatorsMethodsMap[item.type](item, cache);
        }
      }
    }

    cache.mutate(item);
  });
}
