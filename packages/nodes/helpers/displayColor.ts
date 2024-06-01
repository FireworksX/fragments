export const displayColor = (color?: unknown) => {
  if (color) {
    if (typeof color === "string") return color;

    if (color.r) {
      return color?.a < 1
        ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        : `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
  }

  return undefined;
};
