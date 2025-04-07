import { LinkKey } from "@graph-state/core";
import { useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { definition } from "@fragmentsx/definition";

export const useLayerBackground = (layerKey: LinkKey) => {
  const [fillType] = useLayerValue(layerKey, "fillType");
  const [solidFill] = useLayerValue(layerKey, "solidFill");

  return useMemo(
    () => ({
      background:
        fillType === definition.paintMode.Solid ? solidFill : "transparent",
    }),
    [fillType, solidFill]
  );
};
