import { LinkKey } from "@graph-state/core";
import { useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { paintMode } from "@/definitions";

export const useLayerBackground = (layerKey: LinkKey) => {
  const [fillType] = useLayerValue(layerKey, "fillType");
  const [solidFill] = useLayerValue(layerKey, "solidFill");

  return useMemo(
    () => ({
      background: fillType === paintMode.Solid ? solidFill : "transparent",
    }),
    [fillType, solidFill]
  );
};
