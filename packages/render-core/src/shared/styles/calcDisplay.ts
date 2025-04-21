import { definition } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";

export const calcDisplay = (manager: GraphState, layerKey: LinkKey) => {
  const layer = manager.resolve(layerKey);

  if (layer.visible === false) {
    return { display: "none" };
  }

  return {
    display: layer.layerMode === definition.layerMode.flex ? "flex" : null,
  };
};
