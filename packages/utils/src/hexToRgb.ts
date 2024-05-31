import { toLongHex } from "./index";

export const hexToRgb = (hex: string) => {
  const longHex = toLongHex(hex)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(longHex)

  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : undefined
}