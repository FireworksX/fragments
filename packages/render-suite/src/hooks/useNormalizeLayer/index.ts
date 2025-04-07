import { useContext } from "react";
import { LinkKey } from "@graph-state/core";
import { getLayer } from "./getLayer";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const getNormalizeLayer = (layerKey: LinkKey, manager: unknown) => {
  const layer = manager?.resolve(layerKey);
  const parsedLayer = getLayer(manager, layerKey);

  return {
    rawLayer: layer,
    layer: parsedLayer,
  };
};

export const useNormalizeLayer = (layerKey: LinkKey, manager?: unknown) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = manager ?? fragmentManager;

  return getNormalizeLayer(layerKey, resultManager);
};
