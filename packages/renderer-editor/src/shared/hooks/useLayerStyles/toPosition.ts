import { to } from "@react-spring/web";
import { positionType } from "@fragments/plugin-fragment";

export const toPosition = (layer, { isTop, isDocument }) => {
  const skipPosition = isTop && isDocument;

  return {
    position: skipPosition ? positionType.relative : layer.position,
    top: to([layer.position, layer.top], (pos, value) =>
      pos === positionType.absolute && !skipPosition ? value : null
    ),
    left: to([layer.position, layer.left], (pos, value) =>
      pos === positionType.absolute && !skipPosition ? value : null
    ),
  };
};
