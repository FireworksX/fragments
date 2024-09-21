import { getConstraintValue } from "@/shared/constraints/getConstrainValue.ts";

export function constrainHeight(height, values, parentSize) {
  if (values.minHeight) {
    height = Math.max(
      getConstraintValue("minHeight", values.minHeight, parentSize),
      height
    );
  }
  if (values.maxHeight) {
    height = Math.min(
      getConstraintValue("maxHeight", values.maxHeight, parentSize),
      height
    );
  }
  return height;
}
