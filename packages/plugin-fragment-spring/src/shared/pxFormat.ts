export const fromPx = (val?: string | number): number => {
  if (typeof val === "string") {
    return Number(val.replace("px", ""));
  }

  return val || 0;
};

export const toPx = (val?: string | number) =>
  typeof val === "string" || typeof val === "number" ? `${val}px` : "0px";
