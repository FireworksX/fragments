import { to } from "@react-spring/web";
import { positionType } from "@fragments/plugin-fragment";

export const toPosition = (layer) => {
  return {
    position: layer.position,
    top: to([layer.position, layer.top], (pos, value) =>
      pos === positionType.absolute ? value : null
    ),
    left: to([layer.position, layer.left], (pos, value) =>
      pos === positionType.absolute ? value : null
    ),
  };
};
