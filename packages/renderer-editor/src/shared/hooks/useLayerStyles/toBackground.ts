import { to } from "@react-spring/web";
import { paintMode } from "@fragments/plugin-fragment";

export const toBackground = (layer) => {
  return {
    background: to([layer.fillType, layer.solidFill], (type, color) =>
      type === paintMode.Solid ? color : null
    ),
  };
};
