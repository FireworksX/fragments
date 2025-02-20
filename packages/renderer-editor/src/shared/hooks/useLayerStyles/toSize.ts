import { fragmentGrowingMode, sizing } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";

const autoSizes = [sizing.Hug];

export const toSize = (layer, { isTop, isDocument, layerParent }) => {
  const toValue = (type: keyof typeof sizing, value: number) => {
    if (autoSizes.includes(type)) {
      return "min-content"; //layerNode?._type === nodes.FragmentInstance ? 'auto' : 'min-content'
    }

    if (type === sizing.Relative) {
      return `${value}%`;
    }

    if (type === sizing.Fill) {
      return `100%`;
    }

    return value;
  };

  let width = null;
  let height = null;

  if ("width" in layer && "widthType" in layer) {
    width = to([layer.widthType, layer.width], (type, value) =>
      isTop &&
      isDocument &&
      layerParent?.horizontalGrow === fragmentGrowingMode.fill
        ? "100%"
        : toValue(type, value)
    );
  }

  if ("height" in layer && "heightType" in layer) {
    height = to([layer.heightType, layer.height], (type, value) =>
      isTop &&
      isDocument &&
      layerParent?.verticalGrow === fragmentGrowingMode.fill
        ? "100%"
        : toValue(type, value)
    );
  }

  return {
    width,
    height,
  };
};
