import { Extender } from "@/types";
import { layerMode } from "@fragments/plugin-state";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

export const sceneStylesExtend: Extender = ({ resolveField, graphKey }) => {
  const cachedIsFlex = createCachedInterpolate();
  const cachedDisplay = createCachedInterpolate();

  const isFlex = cachedIsFlex(
    [resolveField("layerMode")],
    (mode) => mode === layerMode.flex
  );

  return {
    opacity: resolveField("opacity", 1),
    overflow: resolveField("overflow", "hidden"),
    display: cachedDisplay(
      [resolveField("visible", true), isFlex],
      (value, isFlex) => (value ? (isFlex ? "flex" : "block") : "none")
    ),
  };
};
