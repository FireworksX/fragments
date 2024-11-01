import { Extender } from "@/types";
import { sceneStylesExtend } from "./styles/sceneStylesExtend.ts";
import { positionStylesExtend } from "./styles/positionStylesExtend.ts";
import { sizeStylesExtend } from "./styles/sizeStylesExtend.ts";
import { layoutStylesExtend } from "./styles/layoutStylesExtend.ts";
import { cornerStylesExtend } from "./styles/cornerStylesExtend.ts";
import { fillStylesExtend } from "./styles/fillStylesExtend.ts";
import { borderStylesExtend } from "./styles/borderStylesExtend.ts";

export const toCssExtend: Extender = (payload) => {
  return {
    ...payload.graph,
    toCss: () => {
      const sceneStyles = sceneStylesExtend(payload);
      const positionStyles = positionStylesExtend(payload);
      const sizesStyles = sizeStylesExtend(payload);
      const layoutStyles = layoutStylesExtend(payload);
      const cornerStyles = cornerStylesExtend(payload);
      const fillStyles = fillStylesExtend(payload);
      const borderStyles = borderStylesExtend(payload);

      return {
        ...sceneStyles,
        ...positionStyles,
        ...sizesStyles,
        ...layoutStyles,
        ...cornerStyles,
        ...fillStyles,
        ...borderStyles,
      };
    },
  };
};
