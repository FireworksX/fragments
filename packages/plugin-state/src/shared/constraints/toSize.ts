import { animatableValue } from "../../../../plugin-state-builder/src/shared/animatableValue.ts";
import { pinnedOffset } from "./pinnedOffset.ts";
import { sizeAfterApplyingConstraintsAndAspectRatio } from "@/shared/constraints/sizeAfterApplyingConstraintsAndAspectRatio.ts";
import { isFiniteNumber } from "@fragments/utils";
import { Rect, RectProperties } from "@/types/rect.ts";
import { sizing } from "@/definitions.ts";

export const toSize = (values: RectProperties, parentRect: Rect, autoSize) => {
  let width = null;
  let height = null;
  const parentWidth = parentRect ? animatableValue(parentRect).width : null;
  const parentHeight = parentRect ? animatableValue(parentRect).height : null;

  const hOpposingPinsOffset = pinnedOffset(values.left, values.right);
  if (parentWidth && isFiniteNumber(hOpposingPinsOffset)) {
    width = parentWidth - hOpposingPinsOffset;
  } else if (autoSize && values.widthType === sizing.Fill /* Auto */) {
    width = autoSize.width;
  } else if (isFiniteNumber(values.width)) {
    switch (values.widthType) {
      case sizing.Fixed /* FixedNumber */:
        width = values.width;
        break;
      case sizing.Relative /* Percentage */:
        width = parentRect.width * (values.width / 100);
        break;
      case sizing.Fill /* Auto */:
        break;
      default:
      // console.log("never");
      //assertNever(values.widthType);
    }
  }
  const vOpposingPinsOffset = pinnedOffset(values.top, values.bottom);
  if (parentHeight && isFiniteNumber(vOpposingPinsOffset)) {
    height = parentHeight - vOpposingPinsOffset;
  } else if (autoSize && values.heightType === sizing.Fill /* Auto */) {
    height = autoSize.height;
  } else if (isFiniteNumber(values.height)) {
    switch (values.heightType) {
      case sizing.Fixed /* FixedNumber */:
        height = values.height;
        break;
      case sizing.Relative /* Percentage */:
        height = parentRect.height * (values.height / 100);
        break;
      case sizing.Fill /* Auto */:
        break;
    }
  }

  return sizeAfterApplyingConstraintsAndAspectRatio(width, height, values, {
    height: parentHeight ?? 0,
    width: parentWidth ?? 0,
  });
};
