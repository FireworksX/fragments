import { to } from "@react-spring/web";
import { borderType, paintMode, toPx } from "@fragments/plugin-fragment";

export const toBorder = (layer) => {
  return {
    border: to(
      [layer.borderType, layer.borderWidth, layer.borderColor],
      (type, width, color) => {
        if (typeof type === "string" && type !== borderType.None) {
          return `${toPx(width)} ${type.toLowerCase()} ${color}`;
        }

        return "";
      }
    ),
  };
};
