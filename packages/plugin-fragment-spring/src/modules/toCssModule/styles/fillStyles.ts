import { to } from "@react-spring/web";
import { objectToColorString } from "@fragments/utils";
import {
  getFieldValue,
  imagePaintScaleModes,
  paintMode,
} from "@fragments/plugin-fragment";
import { GraphState } from "@graph-state/core";

export const fillStyles = (node, cache: GraphState) => {
  const fillType = getFieldValue(node, "fillType", cache);
  const solidFill = getFieldValue(node, "solidFill", cache);
  const imageFill = getFieldValue(node, "imageFill", cache);
  const imageFillScaleMode = getFieldValue(node, "imageFillScaleMode", cache);

  return {
    background: to(
      [fillType, solidFill, imageFill],
      (fillType, solidFill, imageFill) => {
        if (fillType === paintMode.Solid) {
          return solidFill;
        } else if (fillType === paintMode.Image) {
          return `url({imageFill}) no-repeat`;
        }

        return "";
      }
    ),
    backgroundSize: to([fillType, imageFillScaleMode], (type, scaleMode) => {
      if (type === paintMode.Image) {
        return imagePaintScaleModes[scaleMode];
      }
      return undefined;
    }),
  };
};
