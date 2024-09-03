import * as CSS from "csstype";
import { toPx } from "../../helpers/toPx.ts";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";

export const useParsePositionRules = (layerField: Field) => {
  const layerInvoker = useLayerInvokerNew(layerField);
  const rules: CSS.Properties = {};

  const positionType = layerInvoker("position.type").value;

  rules.position = "relative"; //positionType ?? "relative";

  if (positionType === "absolute") {
    rules.top = toPx(layerInvoker("position.top").value);
    rules.right = toPx(layerInvoker("position.right").value);
    rules.bottom = toPx(layerInvoker("position.bottom").value);
    rules.left = toPx(layerInvoker("position.left").value);
  }

  return rules;
};
