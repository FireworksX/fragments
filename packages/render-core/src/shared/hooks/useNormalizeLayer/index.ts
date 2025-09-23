import { useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { getLayer, GetLayerOptions } from "./getLayer";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const getNormalizeLayer = (
  layerKey: LinkKey,
  manager: unknown,
  options?: GetLayerOptions
) => {
  const layer = manager?.resolve(layerKey);
  const parsedLayer = getLayer(manager, layerKey, options);

  return {
    rawLayer: layer,
    layer: parsedLayer,
  };
};

export const useNormalizeLayer = (
  layerKey: LinkKey,
  manager?: unknown,
  options?: GetLayerOptions
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = manager ?? fragmentManager;

  return getNormalizeLayer(layerKey, resultManager, options);
};
