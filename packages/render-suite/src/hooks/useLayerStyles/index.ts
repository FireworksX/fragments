import { useContext } from "react";
import { LinkKey } from "@graph-state/core";
// import { useLayerValue } from "@/shared/hooks/useLayerValue";
// import { useLayerSize } from "@/shared/hooks/useLayerStyles/useLayerSize";
import { useLayerPosition } from "./useLayerPosition";
import { useLayerSize } from "./useLayerSize";
import { useLayerValue } from "@/hooks/useLayerValue";
import { FragmentContext } from "@fragmentsx/render-core";
import { useLayerBackground } from "@/hooks/useLayerStyles/useLayerBackground";
import { useLayerDisplay } from "@/hooks/useLayerStyles/useLayerDisplay";
import { useLayerBorder } from "@/hooks/useLayerStyles/useLayerBorder";
import { useLayerLayout } from "@/hooks/useLayerStyles/useLayerLayout";

export const useLayerStyles = (layerKey: LinkKey) => {
  try {
    if (!layerKey) {
      throw new Error("Empty layer key");
    }

    const { manager: fragmentManager } = useContext(FragmentContext);
    // const styles =
    const [, , { resultValue: opacity }] = useLayerValue(
      layerKey,
      "opacity",
      fragmentManager
    );

    const [overflow] = useLayerValue(layerKey, "overflow", fragmentManager);
    const { width, height, ...optionalSizes } = useLayerSize(layerKey);
    const { position, top, left } = useLayerPosition(layerKey);
    const display = useLayerDisplay(layerKey);
    const { background } = useLayerBackground(layerKey);
    const { border } = useLayerBorder(layerKey);
    const layout = useLayerLayout(layerKey);
    const [zIndex] = useLayerValue(layerKey, "zIndex", fragmentManager);
    const [borderRadius] = useLayerValue(
      layerKey,
      "borderRadius",
      fragmentManager
    );

    return {
      display,
      border,
      background,
      position,
      top,
      left,
      overflow,
      width,
      height,
      opacity,
      borderRadius,
      zIndex: zIndex !== -1 ? zIndex : null,
      ...layout,
      ...optionalSizes,
      userSelect: "none",
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};
