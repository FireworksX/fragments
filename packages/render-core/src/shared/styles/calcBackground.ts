import { definition, isVariableLink } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";
import { getNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";

export const calcBackground = (manager: GraphState, layerKey: LinkKey) => {
  const rawLayer = manager.resolve(layerKey);
  const { layer } = getNormalizeLayer(layerKey, manager);

  if (!layer?.fillType || !layer.solidFill) {
    return null;
  }

  const isVariable = isVariableLink(layer.solidFill);
  if (isVariable) {
    const { _id } = manager.entityOfKey(layer.solidFill);
    return {
      background:
        layer.fillType === definition.paintMode.Solid
          ? `var(--${_id})`
          : "transparent",
      [`--${_id}`]: "green",
    };
    // const variableValue = manager.re
  }

  return {
    background:
      layer.fillType === definition.paintMode.Solid
        ? layer.solidFill
        : "transparent",
  };
};
