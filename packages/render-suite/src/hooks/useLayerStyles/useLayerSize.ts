import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { to } from "@react-spring/web";
import { useContext, useMemo } from "react";
import { useRenderTarget } from "@/hooks/useRenderTarget";
import { getParent, isTopLevel } from "@fragmentsx/render-core";
import { useLayerValue } from "@/hooks/useLayerValue";
import { InstanceContext } from "@/components/Instance";

const autoSizes = [definition.sizing.Hug];

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { layerKey: instanceLayerKey, parentManager: instanceManager } =
    useContext(InstanceContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const isPartOfInstance = !!instanceLayerKey;
  const layerParent = getParent(fragmentManager, layerKey);
  const layerNode = fragmentManager.resolve(layerKey);

  // useReadInstanceProperty()
  // layerKey,

  const [instanceWidthType] = useLayerValue(
    instanceLayerKey,
    "widthType",
    fragmentManager
  );
  const [instanceHeightType] = useLayerValue(
    instanceLayerKey,
    "heightType",
    fragmentManager
  );
  const [, , { resultValue: width }] = useLayerValue(
    layerKey,
    "width",
    fragmentManager
  );
  const [, , { resultValue: height }] = useLayerValue(
    layerKey,
    "height",
    fragmentManager
  );
  const [widthType] = useLayerValue(layerKey, "widthType", fragmentManager);
  const [heightType] = useLayerValue(layerKey, "heightType", fragmentManager);

  const toValue = (
    type: keyof typeof definition.sizing,
    value: number,
    instanceType: keyof typeof definition.sizing
  ) => {
    if (isTop && isPartOfInstance && !autoSizes.includes(instanceType)) {
      return "100%";
    }
    if (autoSizes.includes(type)) {
      return layerNode?._type === definition.nodes.Instance
        ? "auto"
        : "min-content";
    }

    if (type === definition.sizing.Relative) {
      return `${value}%`;
    }

    if (type === definition.sizing.Fill) {
      return `100%`;
    }

    return value;
  };

  return {
    width:
      isTop &&
      isDocument &&
      layerParent?.horizontalGrow === definition.fragmentGrowingMode.fill
        ? "100%"
        : to(width, (value) => toValue(widthType, value, instanceWidthType)),
    height:
      isTop &&
      isDocument &&
      layerParent?.horizontalGrow === definition.fragmentGrowingMode.fill
        ? "100%"
        : to(height, (value) => toValue(heightType, value, instanceHeightType)),
  };
};
