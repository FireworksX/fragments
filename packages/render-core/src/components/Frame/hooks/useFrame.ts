import { useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { index } from "@/shared/hooks/useLayerStyles";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useFrame = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layer = fragmentManager.entityOfKey(layerKey);
  const styles = index(layerKey);
  const children = useLayerChildren(layerKey);

  return {
    type: layer._type,
    styles,
    children,
  };
};
