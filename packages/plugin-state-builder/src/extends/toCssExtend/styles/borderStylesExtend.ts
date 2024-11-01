import { to } from "@react-spring/web";
import { objectToColorString } from "@fragments/utils";
import { Extender } from "@/types";
import { getRefColor } from "@/shared/getRefColor.ts";
import { toPx } from "@/shared/toPx.ts";
import { borderType } from "@fragments/plugin-state";

export const borderStylesExtend: Extender = ({ resolveField, state }) => {
  const borderTypeValue$ = resolveField("borderType");
  const borderWidthValue$ = resolveField("borderWidth");
  const borderColorValue$ = resolveField("borderColor");

  return {
    border: to(
      [
        borderTypeValue$,
        borderWidthValue$,
        getRefColor(state, borderColorValue$),
      ],
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
