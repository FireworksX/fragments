import { animatableValue } from "@/shared/animatableValue.ts";
import { toSize } from "@/shared/constraints/toSize.ts";

export const toRect = (
  values,
  parentSizeInfo = null,
  autoSize = null,
  pixelAlign
) => {
  let x = values.left || 0;
  let y = values.top || 0;
  const { width, height } = toSize(values, parentSizeInfo, autoSize);
  const parentSizeForPositioning =
    (parentSizeInfo == null ? void 0 : parentSizeInfo.positioning) ?? null;
  const positioningParentWidth = parentSizeForPositioning
    ? animatableValue(parentSizeForPositioning.width)
    : null;
  const positioningParentHeight = parentSizeForPositioning
    ? animatableValue(parentSizeForPositioning.height)
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
  if (pixelAlign) {
    return Rect.pixelAligned(f);
  }
  return f;
};
