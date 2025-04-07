import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useContext, useMemo } from "react";
import { useLayerValue } from "@/hooks/useLayerValue";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useLayerDisplay = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const [layerModeValue] = useLayerValue(layerKey, "layerMode", manager);
  const [visible] = useLayerValue(layerKey, "visible", manager);

  return useMemo(() => {
    if (!visible) {
      return "none";
    }

    return layerModeValue === definition.layerMode.flex ? "flex" : null;
  }, [layerModeValue, visible]);
};
