import { useCallback, useContext } from "preact/compat";
import { StyleSheetContext } from "@/providers/StyleSheetProvider";
import { isBrowser } from "@fragmentsx/utils";
import { useInjectedStyle } from "@/shared/hooks/useInjectedStyle";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useStyleSheet = () => {
  const { manager } = useContext(FragmentContext);
  const { injectStyle } = useInjectedStyle();

  const addLayerStyle = useCallback(
    (layerKey, styles, layer) => {
      const styleSheetCache = manager?.styleSheetCache;

      if (styleSheetCache && "set" in styleSheetCache) {
        styleSheetCache?.set(layerKey, {
          styles,
          layer,
        });

        if (isBrowser) {
          injectStyle();
        }
      }
    },
    [manager]
  );

  return {
    addLayerStyle,
  };
};
