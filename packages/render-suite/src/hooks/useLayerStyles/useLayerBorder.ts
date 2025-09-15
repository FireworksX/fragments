import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/hooks/useLayerValue";
import { useContext, useMemo } from "react";
import { FragmentContext, useCalcLayerBorder } from "@fragmentsx/render-react";

export const useLayerBorder = (layerKey: LinkKey) => {
  const [borderTypeValue] = useLayerValue(layerKey, "borderType");
  const [borderWidth] = useLayerValue(layerKey, "borderWidth");
  const [borderColor] = useLayerValue(layerKey, "borderColor");
  const calcBorder = useCalcLayerBorder(layerKey);

  return useMemo(
    () => calcBorder(borderWidth, borderColor),
    [borderTypeValue, borderWidth, borderColor]
  );
};
