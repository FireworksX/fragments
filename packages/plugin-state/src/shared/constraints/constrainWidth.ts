import { getConstraintValue } from "@/shared/constraints/getConstrainValue.ts";

export function constrainWidth(width, values, parentSize, viewport) {
  if (values.minWidth) {
    width = Math.max(
      getConstraintValue("minWidth", values.minWidth, parentSize, viewport),
      width
    );
  }
  if (values.maxWidth) {
    width = Math.min(
      getConstraintValue("maxWidth", values.maxWidth, parentSize, viewport),
      width
    );
  }
  return width;
}
