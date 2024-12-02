import { constrainWidth } from "@/shared/constraints/constrainWidth.ts";
import { isFiniteNumber } from "@fragments/utils";
import { constrainHeight } from "@/shared/constraints/constrainHeight.ts";
import { sizing } from "@/definitions.ts";

const defaultWidth = 200;
const defaultHeight = 200;

export function sizeAfterApplyingConstraintsAndAspectRatio(
  width,
  height,
  values,
  parentSize
) {
  let w = constrainWidth(
    isFiniteNumber(width) ? width : defaultWidth,
    values,
    parentSize
  );
  let h = constrainHeight(
    isFiniteNumber(height) ? height : defaultHeight,
    values,
    parentSize
  );

  if (isFiniteNumber(values.aspectRatio) && values.aspectRatio > 0) {
    if (isFiniteNumber(values.left) && isFiniteNumber(values.right)) {
      h = w / values.aspectRatio;
    } else if (isFiniteNumber(values.top) && isFiniteNumber(values.bottom)) {
      w = h * values.aspectRatio;
    } else if (values.widthType !== sizing.Fixed /* FixedNumber */) {
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
