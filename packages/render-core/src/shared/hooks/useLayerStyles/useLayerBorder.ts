import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { toPx } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useCalcLayerBorder } from "@/shared/hooks/useLayerStyles/useCalcLayerBorder";

export const useLayerBorder = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [borderWidth] = useLayerValue(layerKey, "borderWidth", fragmentManager);
  const [borderColor] = useLayerValue(layerKey, "borderColor", fragmentManager);
  const calcBorder = useCalcLayerBorder(layerKey);

  return useMemo(
    () => calcBorder(borderWidth, borderColor),
    [borderWidth, borderColor]
  );
};
