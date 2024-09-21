import { sizing } from "@/definitions.ts";

export function valueToDimensionType(value) {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (trimmedValue.endsWith("%")) return sizing.Relative; /* Percentage */
    if (trimmedValue.endsWith("vw") || trimmedValue.endsWith("vh"))
      return 4; /* Viewport */
  }
  return sizing.Fixed; /* FixedNumber */
}
