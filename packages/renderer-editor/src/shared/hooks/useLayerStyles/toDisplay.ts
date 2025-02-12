import { to } from "@react-spring/web";
import { layerMode } from "@fragments/plugin-fragment";

export const toDisplay = (layer) => {
  return {
    display: to([layer.layerMode, layer.visible], (mode, visible) => {
      if (!visible) {
        return "none";
      }

      return mode === layerMode.flex ? "flex" : null;
    }),
  };
};
