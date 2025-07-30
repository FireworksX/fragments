import { useContext, useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useHash } from "@/shared/hooks/useHash";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { useLayerInteractions } from "@/shared/hooks/useLayerInteractions";
import { useLayerLink } from "@/shared/hooks/useLayerLink";

interface Options {
  collectStyle?: boolean;
}

export const useFrame = (layerKey: LinkKey, options?: Options) => {
  const collectStyle = options?.collectStyle ?? true;
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layer = fragmentManager.entityOfKey(layerKey);
  const styles = useLayerStyles(layerKey);
  const children = useLayerChildren(layerKey);
  const hash = useHash(layerKey, fragmentManager);
  const { addLayerStyle } = useStyleSheet(fragmentManager);
  const events = useLayerInteractions(layerKey);
  const link = useLayerLink(layerKey);

  if (collectStyle) {
    addLayerStyle(layerKey, styles, fragmentManager.resolve(layerKey));
  }

  return {
    Tag: link?.isLink ? "a" : "div",
    type: layer?._type,
    hash,
    styles: {}, //isBrowser ? pick(styles, "background") : {},
    children,
    events,
    restProps: link.linkProps,
  };
};
