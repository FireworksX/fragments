import { to } from "@react-spring/web";
import {
  fragmentGrowingMode,
  nodes,
  renderTarget,
  sizing,
} from "@fragments/plugin-state";
import { Extender } from "@/types";
import { createConstantInterpolate } from "@/shared/createConstantInterpolate.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

const autoSizes = [sizing.Hug, sizing.Fill];

export const sizeStylesExtend: Extender = ({
  resolveField,
  graphKey,
  graph,
  state,
}) => {
  const cachedWidth = createCachedInterpolate(`${graphKey}-css-width`);
  const cachedHeight = createCachedInterpolate(`${graphKey}-css-height`);
  const cachedMinWidth = createCachedInterpolate(`${graphKey}-css-minWidth`);
  const cachedMinHeight = createCachedInterpolate(`${graphKey}-css-minHeight`);

  const widthType$ = resolveField("layoutSizingHorizontal");
  const heightType$ = resolveField("layoutSizingVertical");
  const width$ = resolveField("width");
  const height$ = resolveField("height");
  const minWidth$ = resolveField("minWidth");
  const minHeight$ = resolveField("minHeight");
  const renderTargetValue = state.resolve(state.fragment)?.renderTarget;
  const graphType = graph?._type;

  const toValue = (type: keyof typeof sizing, value: number) => {
    const node = state.resolve(graphKey);
    if (autoSizes.includes(type)) {
      return node._type === nodes.FragmentInstance ? "auto" : "min-content";
    }

    if (type === sizing.Relative) {
      return `${value}%`;
    }

    return value;
  };

  if (
    renderTargetValue === renderTarget.document &&
    graphType === nodes.Frame
  ) {
    const parent = state.resolve(graphKey)?.getParent();
    if (parent?._type === nodes.Fragment) {
      return {
        width:
          parent?.horizontalGrow === fragmentGrowingMode.fill
            ? "100%"
            : cachedWidth([widthType$, width$], toValue),
        height:
          parent?.verticalGrow === fragmentGrowingMode.fill
            ? "100%"
            : cachedHeight([heightType$, height$], toValue),
      };
    }
  }

  return {
    width: cachedWidth([widthType$, width$], toValue),
    height: cachedHeight([heightType$, height$], toValue),
    minWidth: cachedMinWidth([sizing.Fixed, minWidth$], toValue),
    minHeight: cachedMinHeight([sizing.Fixed, minHeight$], toValue),
  };
};
