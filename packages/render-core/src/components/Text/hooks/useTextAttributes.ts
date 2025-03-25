import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles";
import { useTextContent } from "@/shared/hooks/useTextContent";

export const useTextAttributes = (layerKey: LinkKey) => {
  const styles = useLayerStyles(layerKey);
  const content = useTextContent(layerKey);

  return {
    styles,
    content,
  };
};
