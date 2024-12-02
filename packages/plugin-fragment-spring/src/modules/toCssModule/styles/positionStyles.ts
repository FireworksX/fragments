import { GraphState } from "@graph-state/core";
import { getFieldValue } from "@fragments/plugin-fragment";
import { animatableValue } from "@/shared/animatableValue.ts";

export const positionStyles = (node, cache: GraphState) => {
  // const renderTargetValue = state.resolve(state.fragment)?.renderTarget;
  // const graphType = graph?._type;
  //
  // if (
  //   renderTargetValue === renderTarget.document &&
  //   graphType === nodes.Frame &&
  //   state.resolve(graph)?.isTopLevel()
  // )
  //   return {};
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
