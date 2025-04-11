import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useLayerBackground = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [fillType] = useLayerValue(layerKey, "fillType", fragmentManager);
  const [solidFill] = useLayerValue(layerKey, "solidFill", fragmentManager);

  return useMemo(
    () => ({
      background:
        fillType === definition.paintMode.Solid ? solidFill : "transparent",
    }),
    [fillType, solidFill]
  );
};
