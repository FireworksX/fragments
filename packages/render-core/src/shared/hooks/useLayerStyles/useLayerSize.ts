import { LinkKey } from "@graph-state/core";
import { to } from "@react-spring/web";
import { fragmentGrowingMode, sizing } from "@fragments/plugin-fragment";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget.ts";
import { getParent, isTopLevel } from "@/shared/helpers";
import { use, useContext, useMemo } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";
import { InstanceContext } from "@/components/Instance";
import { useLayerVariableValue } from "@/shared/hooks/useLayerVariableValue.ts";
import { useReadInstanceProperty } from "@/shared/hooks/useReadInstanceProperty.ts";

const autoSizes = [sizing.Hug];

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = use(FragmentContext);
  const { layerKey: instanceLayerKey, parentManager: instanceManager } =
    use(InstanceContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const isPartOfInstance = !!instanceLayerKey;
  const layerParent = getParent(fragmentManager, layerKey);

  // useReadInstanceProperty()
  // layerKey,

  const [instanceWidthType] = useLayerVariableValue(
    instanceLayerKey,
    "widthType",
    instanceManager
  );
  const [instanceHeightType] = useLayerVariableValue(
    instanceLayerKey,
    "heightType",
    instanceManager
  );
  const width$ = useLayerStyleValue(layerKey, "width");
  const height$ = useLayerStyleValue(layerKey, "height");
  const widthType$ = useLayerStyleValue(layerKey, "widthType");
  const heightType$ = useLayerStyleValue(layerKey, "heightType");

  const toValue = (
    type: keyof typeof sizing,
    value: number,
    instanceType: keyof typeof sizing
  ) => {
    if (isTop && isPartOfInstance && !autoSizes.includes(instanceType)) {
      return "100%";
    }
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
      width$: to(
        [widthType$, width$, instanceWidthType],
        (type, value, instanceType) =>
          isTop &&
          isDocument &&
          layerParent?.horizontalGrow === fragmentGrowingMode.fill
            ? "100%"
            : toValue(type, value, instanceType)
      ),
      height$: to(
        [heightType$, height$, instanceHeightType],
        (type, value, instanceType) =>
          isTop &&
          isDocument &&
          layerParent?.horizontalGrow === fragmentGrowingMode.fill
            ? "100%"
            : toValue(type, value, instanceType)
      ),
    }),
    [
      widthType$,
      width$,
      heightType$,
      height$,
      isTop,
      isDocument,
      instanceWidthType,
      instanceHeightType,
    ]
  );
};
