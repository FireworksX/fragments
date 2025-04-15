import { useContext } from "react";
import { LinkKey } from "@graph-state/core";
import { FragmentContext, useLayerChildren } from "@fragmentsx/render-core";
import { useLayerStyles } from "@/hooks/useLayerStyles";

export const useFrame = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layer = fragmentManager.entityOfKey(layerKey);
  const styles = useLayerStyles(layerKey);
  const children = useLayerChildren(layerKey);

  return {
    type: layer._type,
    styles,
    children,
  };
};
