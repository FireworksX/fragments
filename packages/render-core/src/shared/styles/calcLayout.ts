import { definition } from "@fragmentsx/definition";
import { GraphState, LinkKey } from "@graph-state/core";
import { isValue, toPx } from "@fragmentsx/utils";

export const calcLayout = (manager: GraphState, layerKey: LinkKey) => {
  const layer = manager.resolve(layerKey);
  const isFlex = layer.layerMode === definition.layerMode.flex;

  const result = {
    gap: isValue(layer.layerGap) ? toPx(layer.layerGap) : null,
    "flex-wrap": isFlex ? layer.layerWrap : null,
    "justify-content": isFlex ? layer.layerDistribute : null,
    "flex-direction": isFlex
      ? layer.layerDirection === definition.layerDirection.vertical
        ? "column"
        : "row"
      : null,
    "align-items": isFlex ? layer.layerAlign : null,
    padding: isFlex ? layer.padding : null,
  };

  if (isFlex) {
    result.display = "flex";
  }

  return result;
};
