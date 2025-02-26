import { getLayer } from "@/shared/helpers";
import { useContext, useMemo } from "react";
import { getLayerSchema } from "@/lib/getLayerSchema.ts";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";

export const useLayer = (layerKey: LinkKey, manager?: GraphState) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = manager ?? fragmentManager;
  const [layer] = useGraph(resultManager, layerKey);

  const parsedLayer = getLayer(resultManager, layerKey);
  const schema = useMemo(
    () => getLayerSchema(resultManager?.resolve?.(layerKey)),
    [layerKey]
  );

  return {
    rawLayer: layer,
    layer: parsedLayer,
    schema,
  };
};
