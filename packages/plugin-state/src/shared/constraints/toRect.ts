import { animatableValue } from "../../../../plugin-state-builder/src/shared/animatableValue.ts";
import { toSize } from "@/shared/constraints/toSize.ts";
import { Rect, RectProperties } from "@/types/rect.ts";

export const toRect = (
  values: RectProperties,
  parentRect: Rect = { x: 0, y: 0, width: 0, height: 0 },
  autoSize = null,
  pixelAlign
) => {
  let x = values.left || 0;
  let y = values.top || 0;
  const { width, height } = toSize(values, parentRect, autoSize);

  const positioningParentWidth = parentRect?.width
    ? animatableValue(parentRect.width)
    : null;
  const positioningParentHeight = parentRect.height
    ? animatableValue(parentRect.height)
    : null;

  if (values.left !== null) {
    x = values.left;
  } else if (positioningParentWidth && values.right !== null) {
    x = positioningParentWidth - values.right - width;
  } else if (positioningParentWidth) {
    x = values.centerAnchorX * positioningParentWidth - width / 2;
  }
  if (values.top !== null) {
    y = values.top;
  } else if (positioningParentHeight && values.bottom !== null) {
    y = positioningParentHeight - values.bottom - height;
  } else if (positioningParentHeight) {
    y = values.centerAnchorY * positioningParentHeight - height / 2;
  }

  const f = { x, y, width, height };

  // if (pixelAlign) {
  //   return Rect.pixelAligned(f);
  // }
  return f;
};
