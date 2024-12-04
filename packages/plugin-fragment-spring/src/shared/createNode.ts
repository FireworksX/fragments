import { BaseNode } from "@/types";
import { GraphState, LinkKey } from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { createBreakpointNode } from "@/creators/createBreakpointNode.ts";
import { animatableValue } from "@/shared/animatableValue.ts";
import { getFieldValue } from "@fragments/plugin-fragment";
import { SpringValue } from "@react-spring/web";
import { createTextNode } from "@/creators/createTextNode.ts";

const BREAKPOINT_GAP = 50;

export function createNode(
  initialNode: Partial<BaseNode>,
  cache: GraphState,
  appendTo?: LinkKey
) {
  if (!initialNode) return null;

  let node = initialNode;

  if (node._type === nodes.Frame) {
    node = createFrameNode(node, cache);
  } else if (node._type === nodes.Breakpoint) {
    // const primaryLayerNode = cache.$fragmentSpring.findPrimaryLayer();
    //
    // if (primaryLayerNode) {
    //   const primaryClone = cache.resolve(
    //     primaryLayerNode.clone({
    //       threshold: initialNode.threshold,
    //     })
    //   );
    //   const lastLayer = cache
    //     .resolve(cache.$fragmentSpring.root)
    //     ?.children?.at(-1);
    //   const nextLeft =
    //     animatableValue(getFieldValue(lastLayer, "left", cache)) +
    //     animatableValue(getFieldValue(lastLayer, "width", cache)) +
    //     BREAKPOINT_GAP;
    //   const nextTop = animatableValue(getFieldValue(lastLayer, "top", cache));
    //
    //   // node = createBreakpointNode(
    //   //   {
    //   //     ...cache.resolve(primaryClone),
    //   //     threshold: initialNode.threshold,
    //   //   },
    //   //   cache
    //   // );
    //
    //   primaryClone._type = nodes.Breakpoint;
    //   primaryClone.left = new SpringValue(nextLeft);
    //   primaryClone.top = new SpringValue(nextTop);
    //
    //   console.log(primaryClone);
    // }
  } else if (node._type === nodes.Text) {
    node = createTextNode(node, cache);
  }

  if (appendTo) {
    const parentNode = cache.resolve(appendTo);
    parentNode?.appendChild?.(node);
  }

  return node;
}
