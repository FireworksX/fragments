import { useContext, useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useHash } from "@/shared/hooks/useHash";
import { isBrowser, pick } from "@fragmentsx/utils";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useLayerInteractions } from "@/shared/hooks/useLayerInteractions";
import { useLayerLink } from "@/shared/hooks/useLayerLink";

export const useFrame = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layer = fragmentManager.entityOfKey(layerKey);
  const styles = useLayerStyles(layerKey);
  const children = useLayerChildren(layerKey);
  const hash = useHash(layerKey, fragmentManager);
  const { addLayerStyle } = useStyleSheet(fragmentManager);
  const events = useLayerInteractions(layerKey);
  const link = useLayerLink(layerKey);

  addLayerStyle(layerKey, styles, fragmentManager.resolve(layerKey));

  // if (fragmentManager.styleSheetCache && fragmentManager) {
  //   fragmentManager.styleSheetCache.set(hash);
  // }

  const restProps = useMemo(() => {
    if (link.isLink) {
      return {
        target:
          link.linkTarget === definition.linkTarget._blank
            ? definition.linkTarget._blank
            : null,
        href: link.linkHref,
      };
    }

    return {};
  }, [link]);

  return {
    Tag: link?.isLink ? "a" : "div",
    type: layer?._type,
    hash,
    styles: {}, //isBrowser ? pick(styles, "background") : {},
    children,
    events,
    restProps,
  };
};
