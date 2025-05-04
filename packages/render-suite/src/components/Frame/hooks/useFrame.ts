import { useContext } from "react";
import { LinkKey } from "@graph-state/core";
import {
  FragmentContext,
  useLayerChildren,
  useFrame as useFrameCore,
  InstanceContext,
} from "@fragmentsx/render-core";
import { useLayerStyles } from "@/hooks/useLayerStyles";

export const useFrame = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const frameCore = useFrameCore(layerKey);
  const layer = manager?.entityOfKey(layerKey);
  const styles = useLayerStyles(layerKey);
  const children = useLayerChildren(layerKey);

  return {
    ...frameCore,
    type: layer?._type,
    styles: !instanceLayerKey ? styles : {},
    children,
  };
};
