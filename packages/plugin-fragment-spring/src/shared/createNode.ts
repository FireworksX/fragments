import { BaseNode } from "@/types";
import { GraphState, LinkKey } from "@graph-state/core";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { createBreakpointNode } from "@/creators/createBreakpointNode.ts";
import { nodes, variableType } from "@fragments/plugin-fragment";
import { createTextNode } from "@/creators/createTextNode.ts";
import { createImageNode } from "@/creators/createImageNode.ts";
import { createNumberVariable } from "@/creators/variables/createNumberVariable.ts";
import { createBooleanVariable } from "@/creators/variables/createBooleanVariable.ts";
import { createStringVariable } from "@/creators/variables/createStringVariable.ts";
import { createFragmentNode } from "@/creators/createFragmentNode.ts";
import { createObjectVariable } from "@/creators/variables/createObjectVariable.ts";
import { createArrayVariable } from "@/creators/variables/createArrayVariable.ts";
import { createFragmentInstanceNode } from "@/creators/createFragmentInstanceNode.ts";

const BREAKPOINT_GAP = 50;

export function createNode(
  initialNode: Partial<BaseNode>,
  cache: GraphState,
  appendTo?: LinkKey
) {
  if (!initialNode) return null;

  let node = initialNode;

  if (node._type === nodes.Frame && node?.isBreakpoint) {
    node = createBreakpointNode(node, cache);
  } else if (node._type === nodes.Frame) {
    node = createFrameNode(node, cache);
  } else if (node._type === nodes.Text) {
    node = createTextNode(node, cache);
  } else if (node._type === nodes.Image) {
    node = createImageNode(node, cache);
  } else if (node._type === nodes.Variable && !!node.type) {
    const creatorsMethodsMap = {
      [variableType.Number]: createNumberVariable,
      [variableType.Boolean]: createBooleanVariable,
      [variableType.String]: createStringVariable,
      [variableType.Object]: createObjectVariable,
      [variableType.Array]: createArrayVariable,
    };

    if (node.type in creatorsMethodsMap) {
      node = creatorsMethodsMap[node.type](node, cache);
    }
  } else if (node._type === nodes.Fragment) {
    node = createFragmentNode(node, cache);
  } else if (node._type === nodes.FragmentInstance) {
    node = createFragmentInstanceNode(node, cache);
  }

  if (appendTo) {
    const parentNode = cache.resolve(appendTo);
    parentNode?.appendChild?.(node);
  }

  return node;
}
