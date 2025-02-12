import { sizing } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";

const autoSizes = [sizing.Hug];

export const toSize = (layer) => {
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
      toValue(type, value)
    );
  }

  if ("height" in layer && "heightType" in layer) {
    height = to([layer.heightType, layer.height], (type, value) =>
      toValue(type, value)
    );
  }

  return {
    width,
    height,
  };
};
