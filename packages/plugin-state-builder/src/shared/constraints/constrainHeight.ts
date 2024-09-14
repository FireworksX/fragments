import { getConstraintValue } from "@/shared/constraints/getConstrainValue.ts";

export function constrainHeight(height, values, parentSize, viewport) {
  if (values.minHeight) {
    height = Math.max(
      getConstraintValue("minHeight", values.minHeight, parentSize, viewport),
      height
    );
  }
  if (values.maxHeight) {
    height = Math.min(
      getConstraintValue("maxHeight", values.maxHeight, parentSize, viewport),
      height
    );
  }
  return height;
}
