import { useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useLayerSize } from "@/shared/hooks/useLayerStyles/useLayerSize";
import { useLayerPosition } from "@/shared/hooks/useLayerStyles/useLayerPosition";
import { useLayerBackground } from "@/shared/hooks/useLayerStyles/useLayerBackground";
import { useLayerDisplay } from "@/shared/hooks/useLayerStyles/useLayerDisplay";
import { useLayerBorder } from "@/shared/hooks/useLayerStyles/useLayerBorder";
import { useLayerLayout } from "@/shared/hooks/useLayerStyles/useLayerLayout";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const index = (layerKey: LinkKey) => {
  try {
    if (!layerKey) {
      throw new Error("Empty layer key");
    }
    const { manager: fragmentManager } = useContext(FragmentContext);
    const [opacity] = useLayerValue(layerKey, "opacity", fragmentManager);
    const { width, height } = useLayerSize(layerKey);
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
      width,
      height,
      opacity,
      borderRadius,
      zIndex: zIndex !== -1 ? zIndex : null,
      ...layout,
      userSelect: "none",
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};
