import { layerDirection, layerMode } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";

export const toLayer = (layer) => {
  const isFlex = to(layer.layerMode, (v) => v === layerMode.flex);

  return {
    gap: to([isFlex, layer.layerGap], (flag, value) => (flag ? value : null)),
    flexWrap: to([isFlex, layer.layerWrap], (flag, value) =>
      flag ? value : null
    ),
    justifyContent: to([isFlex, layer.layerDistribute], (flag, value) =>
      flag ? value : null
    ),
    flexDirection: to([isFlex, layer.layerDirection], (flag, value) =>
      flag ? (value === layerDirection.vertical ? "column" : "row") : null
    ),
    alignItems: to([isFlex, layer.layerAlign], (flag, value) =>
      flag ? `flex-${value}` : null
    ),
  };
};
