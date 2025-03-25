import { useMemo } from "react";
import { LinkKey } from "@graph-state/core";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";
import { useLayerSize } from "@/shared/hooks/useLayerStyles/useLayerSize.ts";
import { useLayerPosition } from "@/shared/hooks/useLayerStyles/useLayerPosition.ts";
import { useLayerDisplay } from "@/shared/hooks/useLayerStyles/useLayerDisplay.ts";
import { useLayerBackground } from "@/shared/hooks/useLayerStyles/useLayerBackground.ts";
import { useLayerBorder } from "@/shared/hooks/useLayerStyles/useLayerBorder.ts";
import { useLayerLayout } from "@/shared/hooks/useLayerStyles/useLayerLayout.ts";

export const useLayerStyles = (layerKey: LinkKey) => {
  const opacity$ = useLayerStyleValue(layerKey, "opacity");
  const { width$, height$ } = useLayerSize(layerKey);
  const { position$, top$, left$ } = useLayerPosition(layerKey);
  const { display$ } = useLayerDisplay(layerKey);
  const { background$ } = useLayerBackground(layerKey);
  const { border$ } = useLayerBorder(layerKey);
  const layout = useLayerLayout(layerKey);
  const zIndex$ = useLayerStyleValue(layerKey, "zIndex");
  const overflow$ = useLayerStyleValue(layerKey, "overflow");
  const whiteSpace$ = useLayerStyleValue(layerKey, "whiteSpace");
  const borderRadius$ = useLayerStyleValue(layerKey, "borderRadius");

  const styles = {
    opacity: opacity$,
    zIndex: zIndex$,
    overflow: overflow$,
    whiteSpace: whiteSpace$,
    borderRadius: borderRadius$,
    position: position$,
    top: top$,
    left: left$,
    width: width$,
    height: height$,
    background: background$,
    display: display$,
    border: border$,
    gap: layout.gap$,
    flexWrap: layout.flexWrap$,
    justifyContent: layout.justifyContent$,
    flexDirection: layout.flexDirection$,
    alignItems: layout.alignItems$,
    padding: layout.padding$,
    userSelect: "none",
  };

  return useMemo(() => {
    return {
      ...styles,
      zIndex: styles.zIndex.to((v) => (v !== -1 ? v : null)),
      userSelect: "none",
    };
  }, Object.values(styles));
};
