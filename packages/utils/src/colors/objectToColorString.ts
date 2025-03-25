import { isObject } from "../isObject";

interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const objectToColorString = <T extends Color>(color: T): T | string => {
  if (!color || !isObject(color)) return color;
  const resR = Number(color.r);
  const resG = Number(color.g);
  const resB = Number(color.b);
  const resA = Number(color.a);

  if ([resR, resG, resB].every(isFinite)) {
    if (resA < 1) {
      return `rgba(${resR}, ${resG}, ${resB}, ${resA})`;
    }

    return `rgb(${resR}, ${resG}, ${resB})`;
  }

  return color;
};
