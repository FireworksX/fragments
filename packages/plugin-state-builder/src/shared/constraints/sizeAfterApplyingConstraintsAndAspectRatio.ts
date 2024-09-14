import { constrainWidth } from "@/shared/constraints/constrainWidth.ts";
import { isFiniteNumber } from "@fragments/utils";
import { constrainHeight } from "@/shared/constraints/constrainHeight.ts";

const defaultWidth = 200;
const defaultHeight = 200;

export function sizeAfterApplyingConstraintsAndAspectRatio(
  width,
  height,
  values,
  parentSize,
  viewport
) {
  let w = constrainWidth(
    isFiniteNumber(width) ? width : defaultWidth,
    values,
    parentSize,
    viewport
  );
  let h = constrainHeight(
    isFiniteNumber(height) ? height : defaultHeight,
    values,
    parentSize,
    viewport
  );
  if (isFiniteNumber(values.aspectRatio) && values.aspectRatio > 0) {
    if (isFiniteNumber(values.left) && isFiniteNumber(values.right)) {
      h = w / values.aspectRatio;
    } else if (isFiniteNumber(values.top) && isFiniteNumber(values.bottom)) {
      w = h * values.aspectRatio;
    } else if (values.widthType !== 0 /* FixedNumber */) {
      h = w / values.aspectRatio;
    } else {
      w = h * values.aspectRatio;
    }
  }
  return {
    width: w,
    height: h,
  };
}
