import { Extender } from "@/types";
import { to } from "@react-spring/core";

export const positionStylesExtend: Extender = ({ resolveField, graph }) => {
  // const { isCanvas } = useRenderTarget()

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
