import { Extender } from "@/types";
import { to } from "@react-spring/web";
import { layerMode } from "@fragments/plugin-state";

export const sceneStylesExtend: Extender = ({ resolveField }) => {
  const isFlex = to(
    resolveField("layerMode"),
    (mode) => mode === layerMode.flex
  );

  return {
    opacity: resolveField("opacity", 1),
    overflow: resolveField("overflow", "hidden"),
    display: to([resolveField("visible", true), isFlex], (value, isFlex) =>
      value ? (isFlex ? "flex" : "block") : "none"
    ),
  };
};
