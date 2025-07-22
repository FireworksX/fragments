import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useTextContent } from "@/shared/hooks/useTextContent";
import { useHash } from "@/shared/hooks/useHash";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useTextAttributes = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const styles = useLayerStyles(layerKey);
  const content = useTextContent(layerKey);
  const hash = useHash(layerKey, fragmentManager);
  const { addLayerStyle } = useStyleSheet(fragmentManager);

  addLayerStyle(layerKey, styles, fragmentManager.resolve(layerKey));

  return {
    hash,
    content,
  };
};
