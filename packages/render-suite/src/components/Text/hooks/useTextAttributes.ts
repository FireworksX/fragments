import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/hooks/useLayerStyles";
import { useContext } from "react";
import { FragmentContext, useTextContent } from "@fragmentsx/render-core";

export const useTextAttributes = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const styles = useLayerStyles(layerKey);
  const content = useTextContent(layerKey, manager);

  return {
    styles,
    content,
  };
};
