import { to } from "@react-spring/web";
import { imagePaintScaleModes, paintMode } from "@fragments/plugin-state";
import { objectToColorString } from "@fragments/utils";
import { Extender } from "@/types";

export const fillStylesExtend: Extender = ({ resolveField }) => {
  const { getColor } = { getColor: () => null }; // useDisplayColor();

  const fillType = resolveField("fillType");
  const solidFill = resolveField("solidFill");
  const imageFill = resolveField("imageFill");
  const imageFillScaleMode = resolveField("imageFillScaleMode");

  return {
    background: to(
      [fillType, solidFill, imageFill],
      (fillType, solidFill, imageFill) => {
        if (fillType === paintMode.Solid) {
          return objectToColorString(solidFill);
        } else if (fillType === paintMode.Image) {
          return `url(${imageFill}) no-repeat`;
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
