import { Extender } from "@/types";
import { nodes, renderTarget } from "@fragments/plugin-state";

export const positionStylesExtend: Extender = ({
  resolveField,
  graph,
  state,
}) => {
  const renderTargetValue = state.resolve(state.fragment)?.renderTarget;
  const graphType = graph?._type;

  if (
    renderTargetValue === renderTarget.document &&
    graphType === nodes.Frame
  ) {
    const parent = state.resolve(graph)?.getParent();
    if (parent?._type === nodes.Fragment) return {};
  }

  const positionType = resolveField("positionType") ?? "absolute";

  if (positionType === "absolute") {
    // if (graph?._type !== nodes.Breakpoint || isCanvas) {
    //   const rect = graph.rect?.()
    //
    const left$ = resolveField("left");
    const top$ = resolveField("top");

    return {
      position: positionType,
      left: left$,
      top: top$,
    };
    // }
  }

  return {
    position: positionType,
  };
};
