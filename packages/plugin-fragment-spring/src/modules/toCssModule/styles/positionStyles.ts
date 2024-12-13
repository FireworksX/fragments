import { GraphState } from "@graph-state/core";
import { getFieldValue, nodes, renderTarget } from "@fragments/plugin-fragment";
import { animatableValue } from "@/shared/animatableValue.ts";

export const positionStyles = (node, cache: GraphState) => {
  const renderTargetValue = cache.resolve(
    cache.$fragmentSpring.root
  )?.renderTarget;
  const graphType = node?._type;
  //

  if (
    renderTargetValue === renderTarget.document &&
    graphType === nodes.Frame &&
    cache.resolve(node)?.isTopLevel()
  )
    return {};
  //
  const positionType = getFieldValue(node, "positionType", cache) ?? "absolute";

  if (animatableValue(positionType) === "absolute") {
    // if (graph?._type !== nodes.Breakpoint || isCanvas) {
    //   const rect = graph.rect?.()
    //
    const left = getFieldValue(node, "left", cache);
    const top = getFieldValue(node, "top", cache);

    return {
      position: positionType,
      left: left,
      top: top,
    };
    // }
  }

  return {
    position: positionType,
  };
};
