import { opacityProps } from "./opacity.ts";
import { Extender } from "@/types";

export const sceneExtend: Extender = (payload) => {
  const opacity = opacityProps(payload);

  return {
    ...payload.graph,
    ...opacity,
  };
};
