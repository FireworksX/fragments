import { LinkKey } from "@graph-state/core";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useContext } from "react";
import { useLayerChildren } from "@/hooks/useLayerChildren";
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
