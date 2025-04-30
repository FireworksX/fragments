import { useCallback, useContext } from "preact/compat";
import { StyleSheetContext } from "@/providers/StyleSheetProvider";
import { isBrowser } from "@fragmentsx/utils";

export const useStyleSheet = (fallbackCache?: Map<any, any>) => {
  const styleSheetCache = useContext(StyleSheetContext) ?? fallbackCache;

  const addLayerStyle = useCallback((layerKey, styles, layer) => {
    if (!isBrowser && styleSheetCache && "set" in styleSheetCache) {
      styleSheetCache?.set(layerKey, {
        styles,
        layer,
      });
    }
  }, []);

  return {
    isStyleSheetRender: !!styleSheetCache,
    addLayerStyle,
  };
};
