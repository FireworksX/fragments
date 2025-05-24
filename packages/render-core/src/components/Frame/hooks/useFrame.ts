import { useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useHash } from "@/shared/hooks/useHash";
import { isBrowser, pick } from "@fragmentsx/utils";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useLayerInteractions } from "@/shared/hooks/useLayerInteractions";

export const useFrame = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layer = fragmentManager.entityOfKey(layerKey);
  const styles = useLayerStyles(layerKey);
  const children = useLayerChildren(layerKey);
  const hash = useHash(layerKey);
  const { addLayerStyle } = useStyleSheet();
  const events = useLayerInteractions(layerKey);

  addLayerStyle(layerKey, styles, fragmentManager.resolve(layerKey));

  // if (fragmentManager.styleSheetCache && fragmentManager) {
  //   fragmentManager.styleSheetCache.set(hash);
  // }

  return {
    type: layer?._type,
    hash,
    styles: {}, //isBrowser ? pick(styles, "background") : {},
    children,
    events,
  };
};
