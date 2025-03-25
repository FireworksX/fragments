import { opacityProps } from "./opacity.ts";
import { visibleProps } from "./visible.ts";
import { Extender } from "@/types";
import { overflowExtend } from "@/extends/sceneExtend/overflow.ts";

export const sceneExtend: Extender = (payload) => {
  const opacity = opacityProps(payload);
  const visible = visibleProps(payload);
  const overflow = overflowExtend(payload);

  return {
    ...payload.graph,
    ...opacity,
    ...visible,
    ...overflow,
  };
};

sceneExtend.symbol = Symbol("sceneExtend");
