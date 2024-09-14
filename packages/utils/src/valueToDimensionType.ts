export function valueToDimensionType(value) {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    if (trimmedValue === "auto") return 2; /* Auto */
    if (trimmedValue.endsWith("fr")) return 3; /* FractionOfFreeSpace */
    if (trimmedValue.endsWith("%")) return 1; /* Percentage */
    if (trimmedValue.endsWith("vw") || trimmedValue.endsWith("vh"))
      return 4; /* Viewport */
  }
  return 0; /* FixedNumber */
}
