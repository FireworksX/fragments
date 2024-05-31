export const rgbToRgba = (rgb: string, alpha = 1): string => rgb.replace(')', `, ${alpha})`).replace('rgb', 'rgba')
