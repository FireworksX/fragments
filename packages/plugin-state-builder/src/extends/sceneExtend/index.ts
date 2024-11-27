import { opacityProps } from "./opacity.ts";
import { visibleProps } from "./visible.ts";
import { Extender } from "@/types";

export const sceneExtend: Extender = (payload) => {
  const opacity = opacityProps(payload);
  const visible = visibleProps(payload);

  return {
    ...payload.graph,
    ...opacity,
    ...visible,
  };
};

sceneExtend.symbol = Symbol("sceneExtend");
