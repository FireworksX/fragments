import { LinkKey } from "@graph-state/core";
import { getParent, isTopLevel } from "@/shared/helpers";
import { useContext, useMemo } from "preact/compat";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { InstanceContext } from "@/components/Instance";

const autoSizes = [definition.sizing.Hug];

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { layerKey: instanceLayerKey, parentManager: instanceManager } =
    useContext(InstanceContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const isPartOfInstance = false; //!!instanceLayerKey;
  const layerParent = getParent(fragmentManager, layerKey);

  // useReadInstanceProperty()
  // layerKey,

  const [instanceWidthType] = useLayerValue(instanceLayerKey, "widthType");
  const [instanceHeightType] = useLayerValue(instanceLayerKey, "heightType");
  const [width] = useLayerValue(layerKey, "width");
  const [height] = useLayerValue(layerKey, "height");
  const [widthType] = useLayerValue(layerKey, "widthType");
  const [heightType] = useLayerValue(layerKey, "heightType");

  const toValue = (
    type: keyof typeof definition.sizing,
    value: number,
    instanceType: keyof typeof definition.sizing
  ) => {
    if (isTop && isPartOfInstance && !autoSizes.includes(instanceType)) {
      return "100%";
    }
    if (autoSizes.includes(type)) {
      return "min-content"; //layerNode?._type === nodes.FragmentInstance ? 'auto' : 'min-content'
    }

    if (type === definition.sizing.Relative) {
      return `${value}%`;
    }

    if (type === definition.sizing.Fill) {
      return `100%`;
    }

    return value;
  };

  return useMemo(
    () => ({
      width:
        isTop &&
        isDocument &&
        layerParent?.horizontalGrow === definition.fragmentGrowingMode.fill
          ? "100%"
          : toValue(widthType, width, instanceWidthType),
      height:
        isTop &&
        isDocument &&
        layerParent?.horizontalGrow === definition.fragmentGrowingMode.fill
          ? "100%"
          : toValue(heightType, height, instanceHeightType),
    }),
    [isTop, isDocument, width, height, heightType, heightType]
  );
};
