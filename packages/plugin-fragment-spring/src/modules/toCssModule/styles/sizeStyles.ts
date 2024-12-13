import { to } from "@react-spring/web";
import { BaseNode, Extender } from "@/types";
import { GraphState } from "@graph-state/core";
import {
  fragmentGrowingMode,
  getFieldValue,
  nodes,
  renderTarget,
  sizing,
} from "@fragments/plugin-fragment";
// import { createConstantInterpolate } from "@/shared/createConstantInterpolate.ts";
// import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

const autoSizes = [sizing.Hug];

export const sizeStyles = (node: BaseNode, cache: GraphState) => {
  // const cachedWidth = createCachedInterpolate(`{graphKey}-css-width`);
  // const cachedHeight = createCachedInterpolate(`{graphKey}-css-height`);
  // const cachedMinWidth = createCachedInterpolate(`{graphKey}-css-minWidth`);
  // const cachedMinHeight = createCachedInterpolate(`{graphKey}-css-minHeight`);

  const widthType = getFieldValue(node, "layoutSizingHorizontal", cache);
  const heightType = getFieldValue(node, "layoutSizingVertical", cache);
  const width = getFieldValue(node, "width", cache);
  const height = getFieldValue(node, "height", cache);
  const minWidth = getFieldValue(node, "minWidth", cache);
  const minHeight = getFieldValue(node, "minHeight", cache);
  const renderTargetValue = cache.resolve(cache.$fragment.root)?.renderTarget;
  const graphType = node?._type;

  const toValue = (type: keyof typeof sizing, value: number) => {
    if (autoSizes.includes(type)) {
      return graphType === nodes.FragmentInstance ? "auto" : "min-content";
    }

    if (type === sizing.Relative) {
      return `${value}%`;
    }

    if (type === sizing.Fill) {
      return `100%`;
    }

    return value;
  };

  if (
    renderTargetValue === renderTarget.document &&
    graphType === nodes.Frame
  ) {
    const parent = cache.resolve(node)?.getParent();

    if (parent?._type === nodes.Fragment) {
      return {
        width:
          parent?.horizontalGrow === fragmentGrowingMode.fill
            ? "100%"
            : to([widthType, width], toValue),
        height:
          parent?.verticalGrow === fragmentGrowingMode.fill
            ? "100%"
            : to([heightType, height], toValue),
      };
    }
  }

  return {
    width: to([widthType, width], toValue),
    height: to([heightType, height], toValue),
    minWidth: to([sizing.Fixed, minWidth], toValue),
    minHeight: to([sizing.Fixed, minHeight], toValue),
  };
};
