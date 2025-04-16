import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { to } from "@react-spring/web";
import { useContext, useMemo } from "react";
import {
  useRenderTarget,
  getParent,
  isTopLevel,
  FragmentContext,
  InstanceContext,
} from "@fragmentsx/render-core";
import { useLayerValue } from "@/hooks/useLayerValue";
import { useOptionalSize } from "@/hooks/useLayerStyles/useOptionalSize";

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
  const minWidth = useOptionalSize("minWidth", layerKey);
  const minHeight = useOptionalSize("minHeight", layerKey);
  const maxWidth = useOptionalSize("maxWidth", layerKey);
  const maxHeight = useOptionalSize("maxHeight", layerKey);

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

  return useMemo(
    () => ({
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
          : to(height, (value) =>
              toValue(heightType, value, instanceHeightType)
            ),
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    }),
    [
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      isTop,
      isDocument,
      width,
      widthType,
      instanceWidthType,
      layerParent,
      height,
      heightType,
      instanceHeightType,
    ]
  );
};
