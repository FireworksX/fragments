import { hexToRgb } from "src";

interface OutputColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const getRgbFromColor = (color: string): OutputColor | null => {
  if (!color) return null;

  if (typeof color === "string" && color.startsWith("#")) {
    return hexToRgb(color) || null;
  }

  if (typeof color === "string") {
    const [r, g, b, a] = color.match(/\d+/g) ?? [];

    if (!r) {
      return null;
    }

    return {
      r: +r,
      g: +g,
      b: +b,
      a: +a,
    };
  }

  return color;
};
