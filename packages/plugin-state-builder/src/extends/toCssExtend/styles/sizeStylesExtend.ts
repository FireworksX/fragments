import { to } from "@react-spring/web";
import { sizing } from "@fragments/plugin-state";
import { Extender } from "@/types";

const autoSizes = [sizing.Hug, sizing.Fill];

export const sizeStylesExtend: Extender = ({ resolveField }) => {
  const widthType$ = resolveField("layoutSizingHorizontal");
  const heightType$ = resolveField("layoutSizingVertical");
  const width$ = resolveField("width");
  const height$ = resolveField("height");
  const minWidth$ = resolveField("minWidth");
  const minHeight$ = resolveField("minHeight");

  const toValue = (type: keyof typeof sizing, value: number) => {
    if (autoSizes.includes(type)) {
      return "auto";
    }

    if (type === sizing.Relative) {
      return `${value}%`;
    }

    return value;
  };

  return {
    width: to([widthType$, width$], toValue),
    height: to([heightType$, height$], toValue),
    minWidth: to([sizing.Fixed, minWidth$], toValue),
    minWeight: to([sizing.Fixed, minHeight$], toValue),
  };
};
