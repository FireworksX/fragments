import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useTextContent } from "@/shared/hooks/useTextContent";
import { useHash } from "@/shared/hooks/useHash";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export interface UseTextAttributes {
  collectStyle?: boolean;
}

export const useTextAttributes = (
  layerKey: LinkKey,
  options?: UseTextAttributes
) => {
  const collectStyle = options?.collectStyle ?? true;
  const { manager: fragmentManager } = useContext(FragmentContext);
  const styles = useLayerStyles(layerKey);

  const content = useTextContent(layerKey);
  const hash = useHash(layerKey, fragmentManager);
  const { addLayerStyle } = useStyleSheet(fragmentManager);

  if (collectStyle) {
    addLayerStyle(layerKey, styles, fragmentManager.resolve(layerKey));
  }

  return {
    styles,
    hash,
    content,
  };
};
