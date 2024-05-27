import { Field } from "@adstore/statex/src";
import * as CSS from "csstype";
import { toPx } from "../../helpers/toPx.ts";
import { useDisplayColor } from "../useDisplayColor.ts";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";
import {
  builderImagePaintScaleModes,
  builderPaintMode,
} from "@adstore/web/src/data/promos/creators";

const scaleModeMap: Record<
  keyof typeof builderImagePaintScaleModes,
  CSS.Properties["backgroundSize"]
> = {
  Fill: "cover",
  Fit: "contain",
  Crop: "auto",
};

export const useParseStyleRules = (layerField: Field) => {
  const layerInvoker = useLayerInvokerNew(
    layerField,
    undefined,
    ({ node, key }) => {
      switch (key) {
        case "currentFill":
          return node?.getCurrentFill?.();
      }
    }
  );
  const { getColor } = useDisplayColor();
  const rules: CSS.Properties = {};

  rules.opacity = layerInvoker("opacity").value;
  rules.borderRadius = toPx(layerInvoker("cornerRadius").value);

  if (layerInvoker("visible").value === false) {
    rules.display = "none";
  }

  const borderValue = layerInvoker("border").value;
  if (borderValue) {
    rules.borderWidth = toPx(borderValue.width);
    rules.borderStyle = borderValue.type?.toLowerCase();
    rules.borderColor = getColor(borderValue.color);
  }

  const currentFill = layerInvoker("currentFill").value;
  if (currentFill) {
    if (currentFill.type === builderPaintMode.Solid) {
      rules.backgroundColor = getColor(currentFill.color);
    } else if (currentFill.type === builderPaintMode.Image) {
      rules.background = `url(${currentFill?.url}) no-repeat`;
      rules.backgroundSize = scaleModeMap[currentFill.scaleMode];
    }
  }

  return rules;
};
