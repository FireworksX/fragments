import { useContext, useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { definition } from "@fragmentsx/definition";
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
