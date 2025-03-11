import { LinkKey } from "@graph-state/core";
import { getParent, isTopLevel } from "@/shared/helpers";
import { useContext, useMemo } from "preact/compat";
import { fragmentGrowingMode, sizing } from "@/definitions";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { useLayerValue } from "@/shared/hooks/useLayerValue";

const autoSizes = [sizing.Hug];

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  // const { layerKey: instanceLayerKey, parentManager: instanceManager } =
  //   use(InstanceContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const isPartOfInstance = false; //!!instanceLayerKey;
  const layerParent = getParent(fragmentManager, layerKey);

  // useReadInstanceProperty()
  // layerKey,

  // const [instanceWidthType] = useLayerVariableValue(
  //   instanceLayerKey,
  //   "widthType",
  //   instanceManager
  // );
  // const [instanceHeightType] = useLayerVariableValue(
  //   instanceLayerKey,
  //   "heightType",
  //   instanceManager
  // );
  const [width] = useLayerValue(layerKey, "width");
  const [height] = useLayerValue(layerKey, "height");
  const [widthType] = useLayerValue(layerKey, "widthType");
  const [heightType] = useLayerValue(layerKey, "heightType");

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
      width:
        isTop &&
        isDocument &&
        layerParent?.horizontalGrow === fragmentGrowingMode.fill
          ? "100%"
          : toValue(widthType, width, null),
      height:
        isTop &&
        isDocument &&
        layerParent?.horizontalGrow === fragmentGrowingMode.fill
          ? "100%"
          : toValue(heightType, height, null),
    }),
    [isTop, isDocument, width, height, heightType, heightType]
  );
};
