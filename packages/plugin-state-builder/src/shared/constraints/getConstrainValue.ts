export function getConstraintValue(constraint, value, parentSize, viewport) {
  if (typeof value === "string") {
    if (value.endsWith("%") && parentSize) {
      switch (constraint) {
        case "maxWidth":
        case "minWidth":
          return (parseFloat(value) / 100) * parentSize.width;
        case "maxHeight":
        case "minHeight":
          return (parseFloat(value) / 100) * parentSize.height;
        default:
          break;
      }
    }
    if (value.endsWith("vh") && viewport) {
      switch (constraint) {
        case "maxWidth":
        case "minWidth":
          return (parseFloat(value) / 100) * viewport.width;
        case "maxHeight":
        case "minHeight":
          return (parseFloat(value) / 100) * viewport.height;
        default:
          break;
      }
    }
    return parseFloat(value);
  }
  return value;
}
