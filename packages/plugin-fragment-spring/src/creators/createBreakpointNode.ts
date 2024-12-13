import { GraphState } from "@graph-state/core";
import { FrameNode } from "@/types";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { createFrameNode, getFieldValue } from "@fragments/plugin-fragment";
import { SpringValue } from "@react-spring/web";
import { animatableValue } from "@/shared/animatableValue.ts";
import { nodes } from "@/definitions.ts";

const BREAKPOINT_GAP = 50;

export function createBreakpointNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const primaryLayerNode = cache.$fragment?.findPrimaryLayer?.();
  if (primaryLayerNode) {
    const lastLayer = cache.resolve(cache.$fragment?.root)?.children?.at(-1);
    const nextLeft =
      animatableValue(getFieldValue(lastLayer, "left", cache)) +
      animatableValue(getFieldValue(lastLayer, "width", cache)) +
      BREAKPOINT_GAP;
    const nextTop = animatableValue(getFieldValue(lastLayer, "top", cache));

    // node = createBreakpointNode(
    //   {
    //     ...cache.resolve(primaryClone),
    //     threshold: initialNode.threshold,
    //   },
    //   cache
    // );

    // primaryClone._type = nodes.Breakpoint;
    // primaryClone.left = new SpringValue(nextLeft);
    // primaryClone.top = new SpringValue(nextTop);

    const primaryClone = cache.resolve(
      primaryLayerNode.clone({
        ...initialNode,
        left: new SpringValue(nextLeft),
        top: new SpringValue(nextTop),
        isBreakpoint: true,
      })
    );

    const parentNode = cache.resolve(cache?.$fragment?.root);
    parentNode?.appendChild?.(primaryClone);
  }
  // const frameNode = createFrameNode(initialNode, cache);

  return null;
}
