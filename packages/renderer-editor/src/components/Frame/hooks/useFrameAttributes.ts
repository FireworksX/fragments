import { LinkKey } from "@graph-state/core";
import { frameStylesSchema } from "@/shared/schemas/styles/nodes/frameStylesSchema.ts";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles.ts";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren.ts";

export const useFrameAttributes = (layerKey: LinkKey) => {
  const styles = useLayerStyles(layerKey, frameStylesSchema);
  const children = useLayerChildren(layerKey);

  return {
    styles,
    children,
  };
};
