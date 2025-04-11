import { useContext, useMemo } from "react";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useLayerValue } from "@/hooks/useLayerValue";
import { FragmentContext } from "@fragmentsx/render-core";

export const useLayerBackground = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [, , { resultValue: fillType }] = useLayerValue(
    layerKey,
    "fillType",
    fragmentManager
  );
  const [, , { resultValue: solidFill }] = useLayerValue(
    layerKey,
    "solidFill",
    fragmentManager
  );

  return useMemo(
    () => ({
      background:
        fillType === definition.paintMode.Solid ? solidFill : "transparent",
    }),
    [fillType, solidFill]
  );
};
