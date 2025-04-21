import { definition, isVariableLink } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";

export const calcBackground = (manager: GraphState, layerKey: LinkKey) => {
  const layer = manager.resolve(layerKey);

  if (!layer?.fillType || !layer.solidFill || isVariableLink(layer.solidFill)) {
    return null;
  }

  return {
    background:
      layer.fillType === definition.paintMode.Solid
        ? layer.solidFill
        : "transparent",
  };
};
