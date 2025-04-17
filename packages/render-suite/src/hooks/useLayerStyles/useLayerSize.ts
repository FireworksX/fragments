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
  useLayerSizeValue,
} from "@fragmentsx/render-core";
import { useLayerValue } from "@/hooks/useLayerValue";
import { useOptionalSize } from "@/hooks/useLayerStyles/useOptionalSize";

const autoSizes = [definition.sizing.Hug];

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const minWidth = useOptionalSize("minWidth", layerKey);
  const minHeight = useOptionalSize("minHeight", layerKey);
  const maxWidth = useOptionalSize("maxWidth", layerKey);
  const maxHeight = useOptionalSize("maxHeight", layerKey);
  const widthCalc = useLayerSizeValue(layerKey, "width");
  const heightCalc = useLayerSizeValue(layerKey, "height");

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

  return useMemo(
    () => ({
      width: to(width, widthCalc),
      height: to(height, heightCalc),
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
      width,
      height,
      widthCalc,
      heightCalc,
    ]
  );
};
