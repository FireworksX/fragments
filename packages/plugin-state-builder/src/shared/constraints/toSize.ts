import { animatableValue } from "@/shared/animatableValue.ts";
import { pinnedOffset } from "./pinnedOffset";
import { sizeAfterApplyingConstraintsAndAspectRatio } from "@/shared/constraints/sizeAfterApplyingConstraintsAndAspectRatio.ts";
import { isFiniteNumber } from "@fragments/utils";

export const toSize = (values, parentSizeInfo, autoSize) => {
  let width = null;
  let height = null;
  const parentWidth = (parentSizeInfo == null ? void 0 : parentSizeInfo.sizing)
    ? animatableValue(
        parentSizeInfo == null ? void 0 : parentSizeInfo.sizing.width
      )
    : null;
  const parentHeight = (parentSizeInfo == null ? void 0 : parentSizeInfo.sizing)
    ? animatableValue(
        parentSizeInfo == null ? void 0 : parentSizeInfo.sizing.height
      )
    : null;
  const hOpposingPinsOffset = pinnedOffset(values.left, values.right);
  if (parentWidth && isFiniteNumber(hOpposingPinsOffset)) {
    width = parentWidth - hOpposingPinsOffset;
  } else if (autoSize && values.widthType === 2 /* Auto */) {
    width = autoSize.width;
  } else if (isFiniteNumber(values.width)) {
    switch (values.widthType) {
      case 0 /* FixedNumber */:
        width = values.width;
        break;
      case 1 /* Percentage */:
      case 4 /* Viewport */:
        if (parentWidth) {
          width = parentWidth * values.width;
        }
        break;
      case 2 /* Auto */:
        break;
      default:
        console.log("never");
      //assertNever(values.widthType);
    }
  }
  const vOpposingPinsOffset = pinnedOffset(values.top, values.bottom);
  if (parentHeight && isFiniteNumber(vOpposingPinsOffset)) {
    height = parentHeight - vOpposingPinsOffset;
  } else if (autoSize && values.heightType === 2 /* Auto */) {
    height = autoSize.height;
  } else if (isFiniteNumber(values.height)) {
    switch (values.heightType) {
      case 0 /* FixedNumber */:
        height = values.height;
        break;
      case 1 /* Percentage */:
      case 4 /* Viewport */:
        if (parentHeight) {
          height = parentHeight * values.height;
        }
        break;
      case 2 /* Auto */:
        break;
    }
  }
  return sizeAfterApplyingConstraintsAndAspectRatio(
    width,
    height,
    values,
    {
      height: parentHeight ?? 0,
      width: parentWidth ?? 0,
    },
    parentSizeInfo == null ? void 0 : parentSizeInfo.viewport
  );
};
