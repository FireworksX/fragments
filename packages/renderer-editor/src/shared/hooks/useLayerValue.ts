import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { getLayer } from "@/shared/helpers/getLayer.ts";

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager: GraphState
) => {
  const [_, updateLayerData] = useGraph(manager, layerKey);
  const parsedLayer = getLayer(manager, layerKey);

  return [
    parsedLayer?.[fieldKey],
    (value) => updateLayerData({ [fieldKey]: value }),
  ];
};
