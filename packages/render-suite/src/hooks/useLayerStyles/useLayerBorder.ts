import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/hooks/useLayerValue";
import { useContext, useMemo } from "react";
import { FragmentContext, useCalcLayerBorder } from "@fragmentsx/render-react";

export const useLayerBorder = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const [borderTypeValue] = useLayerValue(layerKey, "borderType", manager);
  const [borderWidth] = useLayerValue(layerKey, "borderWidth", manager);
  const [borderColor] = useLayerValue(layerKey, "borderColor", manager);
  const calcBorder = useCalcLayerBorder(layerKey);

  return useMemo(
    () => calcBorder(borderWidth, borderColor),
    [borderTypeValue, borderWidth, borderColor]
  );
};
