import { useContext, useMemo } from "react";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useLayerValue } from "@/hooks/useLayerValue";
import { FragmentContext } from "@fragmentsx/render-core";

export const useLayerBackground = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [fillType] = useLayerValue(layerKey, "fillType", fragmentManager);
  const [, , { resultValue: solidFill }] = useLayerValue(
    layerKey,
    "solidFill",
    fragmentManager
  );

  const [, , { resultValue: imageFill }] = useLayerValue(
    layerKey,
    "imageFill",
    fragmentManager
  );

  return useMemo(() => {
    if (fillType === definition.paintMode.Solid) {
      return {
        background: solidFill,
      };
    }
    if (fillType === definition.paintMode.Image) {
      return {
        background: `url(${imageFill})`,
      };
    }

    return {
      background: "transparent",
    };
  }, [fillType, solidFill, imageFill]);
};
