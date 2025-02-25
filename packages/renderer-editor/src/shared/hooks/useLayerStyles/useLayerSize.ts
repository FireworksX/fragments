import { LinkKey } from "@graph-state/core";
import { to } from "@react-spring/web";
import { fragmentGrowingMode, sizing } from "@fragments/plugin-fragment";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget.ts";
import { getParent, isTopLevel } from "@/shared/helpers";
import { useContext, useMemo } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";

const autoSizes = [sizing.Hug];

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const layerParent = getParent(fragmentManager, layerKey);
  const width$ = useLayerStyleValue(layerKey, "width");
  const height$ = useLayerStyleValue(layerKey, "height");
  const widthType$ = useLayerStyleValue(layerKey, "widthType");
  const heightType$ = useLayerStyleValue(layerKey, "heightType");

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

  return useMemo(
    () => ({
      width$: to([widthType$, width$], (type, value) =>
        isTop &&
        isDocument &&
        layerParent?.horizontalGrow === fragmentGrowingMode.fill
          ? "100%"
          : toValue(type, value)
      ),
      height$: to([heightType$, height$], (type, value) =>
        isTop &&
        isDocument &&
        layerParent?.horizontalGrow === fragmentGrowingMode.fill
          ? "100%"
          : toValue(type, value)
      ),
    }),
    [widthType$, width$, heightType$, height$, isTop, isDocument]
  );
};
