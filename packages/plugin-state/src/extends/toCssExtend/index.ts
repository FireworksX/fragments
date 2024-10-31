import { Extender } from "@/types";
import { sceneStylesExtend } from "./styles/sceneStylesExtend.ts";

export const toCssExtend: Extender = (payload) => {
  return {
    ...payload.graph,
    toCss: () => {
      const sceneStyles = sceneStylesExtend(payload);

      return {
        ...sceneStyles,
      };
    },
  };
};
