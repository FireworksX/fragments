import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/hooks/useLayerStyles";
import { useTextContent } from "@/hooks/useTextContent";
import { useContext } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useTextAttributes = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const styles = useLayerStyles(layerKey);
  const content = useTextContent(layerKey, manager);

  return {
    styles,
    content,
  };
};
