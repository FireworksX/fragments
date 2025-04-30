import { definition } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";
import { getNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";

export const calcDisplay = (manager: GraphState, layerKey: LinkKey) => {
  const { layer } = getNormalizeLayer(layerKey, manager);
  // const layer = manager.resolve(layerKey);

  if (layer.visible === false) {
    return { display: "none" };
  }

  return {
    display: layer.layerMode === definition.layerMode.flex ? "flex" : null,
  };
};
