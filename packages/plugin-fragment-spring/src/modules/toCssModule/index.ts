import { BaseNode, Extender } from "@/types";
import { positionStyles } from "./styles/positionStyles.ts";
import { sizeStyles } from "./styles/sizeStyles.ts";
import { layerStyles } from "./styles/layerStyles.ts";
import { cornerStyles } from "./styles/cornerStyles.ts";
import { fillStyles } from "./styles/fillStyles.ts";
import { GraphState } from "@graph-state/core";
import { getFieldValue, layerMode } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";
import { paddingStyles } from "@/modules/toCssModule/styles/paddingStyles.ts";

export const toCssModule = <T extends BaseNode>(node: T, cache: GraphState) => {
  return {
    ...node,
    toCss: () => {
      // const sceneStyles = sceneStylesExtend(payload);
      // const positionCss = positionStyles(payload);
      // const sizesStyles = sizeStylesExtend(payload);
      // const layoutStyles = layoutStylesExtend(payload);
      // const cornerStyles = cornerStylesExtend(payload);
      // const fillStyles = fillStylesExtend(payload);
      // const borderStyles = borderStylesExtend(payload);

      return {
        ...positionStyles(node, cache),
        ...sizeStyles(node, cache),
        ...fillStyles(node, cache),
        ...cornerStyles(node, cache),
        ...layerStyles(node, cache),
        ...paddingStyles(node, cache),
        // ...sizesStyles,
        // ...layoutStyles,
        // ...cornerStyles,
        // ...fillStyles,
        // ...borderStyles,
        // ...sceneStyles,
        opacity: getFieldValue(node, "opacity", cache),
        overflow: getFieldValue(node, "overflow", cache),
        whiteSpace: getFieldValue(node, "whiteSpace", cache),
        display: to(
          [
            getFieldValue(node, "visible", cache),
            getFieldValue(node, "layerMode", cache),
          ],
          (value, lMode) =>
            value ? (lMode === layerMode.flex ? "flex" : "block") : "none"
        ),
        userSelect: "none",
      };
    },
  };
};
