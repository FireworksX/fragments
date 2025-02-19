import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles.ts";
import { textStylesSchema } from "@/shared/schemas/styles/nodes/textStylesSchema.ts";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { useContext } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";

export const useTextAttributes = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const styles = useLayerStyles(layerKey, textStylesSchema);
  const [content] = useLayerValue(layerKey, "content", fragmentManager);

  return {
    styles,
    content,
  };
};
