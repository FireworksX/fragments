import { isValue } from "@fragmentsx/utils";

export const toCSS = (styles: Record<string, string>) =>
  Object.entries(styles)
    .filter(([, value]) => isValue(value) && value !== "")
    .map(
      ([key, value]) =>
        `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
    )
    .join("\n");
