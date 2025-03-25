import { Graph } from "@graph-state/core";
import { to } from "@react-spring/web";
import { objectToColorString } from "@fragments/utils";
import { Extender } from "@/types";
import { borderType } from '@/definitions.ts'

export const borderStylesExtend: Extender = ({resolveField}) => {
  const { getColor } = useDisplayColor();


  const borderTypeValue = resolveField("borderType");
  const borderWidthValue = resolveField("borderWidth");
  const borderColorValue = resolveField("borderColor");

  return {
    border: to(
      [borderTypeValue, borderWidthValue, getColor(borderColorValue)],
      (type, width, color) => {
        if (typeof type === "string" && type !== borderType.None) {
          return `${toPx(width)} ${type.toLowerCase()} ${objectToColorString(
            color
          )}`;
        }
        return "";
      }
    ),
  };
};
