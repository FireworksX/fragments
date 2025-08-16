import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "react";
import {
  FragmentContext,
  useLayerLayout as useLayerLayoutCore,
} from "@fragmentsx/render-react";
import { useLayerValue } from "@/hooks/useLayerValue";

export const useLayerLayout = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const [, , { resultValue: layerGap }] = useLayerValue(
    layerKey,
    "layerGap",
    manager
  );

  const layout = useLayerLayoutCore(layerKey);

  return useMemo(
    () => ({ ...layout, gap: layout.display === "flex" ? layerGap : null }),
    [layout, layerGap]
  );
};
