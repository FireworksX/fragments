import { LinkKey } from "@graph-state/core";
import { frameStylesSchema } from "@/shared/schemas/styles/nodes/frameStylesSchema.ts";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles.ts";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren.ts";
import { useContext } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";

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
