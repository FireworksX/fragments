import { Graph } from "@graph-state/core";
import { layoutStylesExtend } from "./layoutStylesExtend.ts";
import { useSceneStyles } from "./sceneStylesExtend.ts";
import { cornerStylesExtend } from "./cornerStylesExtend.ts";
import { fillStylesExtend } from "./fillStylesExtend.ts";
import { borderStylesExtend } from "./borderStylesExtend.ts";
import { sizeStylesExtend } from "./sizeStylesExtend.ts";
import { positionStylesExtend } from "./positionStylesExtend.ts";

export const useStyles = (graph: Graph) => {
  const layoutStyles = layoutStylesExtend(graph);
  const sceneStyles = useSceneStyles(graph);
  const cornerStyles = cornerStylesExtend(graph);
  const fillStyles = fillStylesExtend(graph);
  const borderStyles = borderStylesExtend(graph);
  const sizeStyles = sizeStylesExtend(graph);
  const positionStyles = positionStylesExtend(graph);

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
