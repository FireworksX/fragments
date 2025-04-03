import { GraphState, LinkKey } from "@graph-state/core";
import { getOverrider } from "@/shared/helpers";
import { getNormalizeLayer } from "@fragmentsx/definition";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useNormalizeLayer = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layerData = fragmentManager.resolve(layerKey);
  const overrider = getOverrider(fragmentManager, layerKey);
  const parsedLayer = getNormalizeLayer(layerData, overrider);

  return {
    rawLayer: layerData,
    layer: parsedLayer,
  };
};
