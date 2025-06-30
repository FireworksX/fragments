import { isValue } from "@fragmentsx/utils";
import type { CSSRules } from "./compareRules";

export const toCSS = (styles: CSSRules): string =>
  Object.entries(styles)
    .filter(
      ([key, value]) =>
        isValue(value) && value !== "" && !["_type", "_id"].includes(key)
    )
    .map(
      ([key, value]) =>
        `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
    )
    .join("\n");
