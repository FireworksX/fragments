const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const rgbStringToHex = (rgb: string) => {
  const match = rgb?.match?.(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  );

  const r = Number(match?.[1]);
  const g = Number(match?.[2]);
  const b = Number(match?.[3]);

  return isNaN(r) ? rgb : rgbToHex(r, g, b);
};
