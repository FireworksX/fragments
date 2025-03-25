import { Extender } from "@/types";
import { layerMode } from "@/definitions.ts";

export const sceneStylesExtend: Extender = ({ graph, resolveField }) => {
  if (!graph) return {};

  const isFlex = resolveField("layerMode") === layerMode.flex;

  return {
    opacity: resolveField("opacity", 1),
    overflow: resolveField("overflow", "hidden"),
    display: resolveField("visible", true)
      ? isFlex
        ? "flex"
        : "block"
      : "none",
  };
};
