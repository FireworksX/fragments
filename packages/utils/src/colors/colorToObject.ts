import { hexToRgb } from "src";
import { getRgbFromColor } from "./getRgbFromColor";

interface OutputColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const colorToObject = (
  color: string | OutputColor
): OutputColor | null => {
  if (!color) return null;
  const isHex = typeof color === "string" && color.startsWith("#");

  if (isHex) {
    const rgbColor = hexToRgb(color);
    if (!rgbColor) return null;

    return {
      r: rgbColor.r,
      g: rgbColor.g,
      b: rgbColor.b,
    };
  }

  if (typeof color === "string") {
    return getRgbFromColor(color);
  }

  if (["r", "g", "b"].every((v) => v in color)) {
    return color;
  }

  return null;
};
