import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles.ts";
import { textStylesSchema } from "@/shared/schemas/styles/nodes/textStylesSchema.ts";
import { useTextContent } from "@/shared/hooks/useTextContent.ts";

export const useTextAttributes = (layerKey: LinkKey) => {
  const styles = useLayerStyles(layerKey, textStylesSchema);
  const content = useTextContent(layerKey);

  return {
    styles,
    content,
  };
};
