import { useCallback, useContext } from "preact/compat";
import { isBrowser } from "@fragmentsx/utils";
import { useInjectedStyle } from "@/shared/hooks/useInjectedStyle";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useStyleSheet = (manager) => {
  const { injectStyle } = useInjectedStyle();

  const addLayerStyle = useCallback(
    (layerKey, styles, layer) => {
      if (manager && "addStyle" in manager?.$styleSheet) {
        manager?.$styleSheet?.addStyle(layerKey, styles, layer);

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
