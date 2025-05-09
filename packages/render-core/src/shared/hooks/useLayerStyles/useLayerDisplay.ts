import { useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { layerMode } from "@/definitions";

export const useLayerDisplay = (layerKey: LinkKey) => {
  const [layerModeValue] = useLayerValue(layerKey, "layerMode");
  const [visible] = useLayerValue(layerKey, "visible");

  return useMemo(() => {
    if (!visible) {
      return "none";
    }

    return layerModeValue === layerMode.flex ? "flex" : null;
  }, [layerModeValue, visible]);
};
