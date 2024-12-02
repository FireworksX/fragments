import { Graph } from "@graph-state/core";
import { layerStyles } from "./layerStyles.ts";
import { useSceneStyles } from "./sceneStylesExtend.ts";
import { cornerStyles } from "./cornerStyles.ts";
import { fillStyles } from "./fillStyles.ts";
import { borderStylesExtend } from "./borderStylesExtend.ts";
import { sizeStyles } from "./sizeStyles.ts";
import { positionStyles } from "./positionStyles.ts";

export const useStyles = (graph: Graph) => {
  const layoutStyles = layoutStyles(graph);
  const sceneStyles = useSceneStyles(graph);
  const cornerStyles = cornerStyles(graph);
  const fillStyles = fillStyles(graph);
  const borderStyles = borderStylesExtend(graph);
  const sizeStyles = sizeStyles(graph);
  const positionStyles = positionStyles(graph);

  return {
    ...layoutStyles,
    ...sceneStyles,
    ...cornerStyles,
    ...fillStyles,
    ...borderStyles,
    ...sizeStyles,
    ...positionStyles,
  };
};
