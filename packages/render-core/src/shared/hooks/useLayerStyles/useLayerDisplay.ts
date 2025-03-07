import { LinkKey } from "@graph-state/core";
import { useMemo } from "react";
import { to } from "@react-spring/web";
import { layerMode } from "@fragments/plugin-fragment";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";

export const useLayerDisplay = (layerKey: LinkKey) => {
  const layerMode$ = useLayerStyleValue(layerKey, "layerMode");
  const visible$ = useLayerStyleValue(layerKey, "visible");

  return useMemo(
    () => ({
      display$: to([layerMode$, visible$], (mode, visible) => {
        if (!visible) {
          return "none";
        }

        return mode === layerMode.flex ? "flex" : null;
      }),
    }),
    [layerMode$, visible$]
  );
};
