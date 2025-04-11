import { LinkKey } from "@graph-state/core";
import { index } from "@/shared/hooks/useLayerStyles";
import { useTextContent } from "@/shared/hooks/useTextContent";

export const useTextAttributes = (layerKey: LinkKey) => {
  const styles = index(layerKey);
  const content = useTextContent(layerKey);

  return {
    styles,
    content,
  };
};
