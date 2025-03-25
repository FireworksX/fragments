import { animatableValue } from "../../../../plugin-state-builder/src/shared/animatableValue.ts";
import { toSize } from "@/shared/constraints/toSize.ts";
import { Rect, RectProperties } from "@/types/rect.ts";
import { GraphState, LinkKey } from "@graph-state/core";

interface ToRectOptions {
  layerKey?: LinkKey;
  values: RectProperties;
  parentRect: Rect;
  autoSize: unknown;
  pixelAlign: boolean;
  state: GraphState;
}

export const toRect = ({
  layerKey,
  values,
  parentRect = { x: 0, y: 0, width: 0, height: 0 },
  autoSize,
  pixelAlign = true,
  state,
}: ToRectOptions) => {
  let x = values.left || 0;
  let y = values.top || 0;
  const { width, height } = toSize({ values, parentRect, autoSize, layerKey });

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

  if (pixelAlign && state?.rect?.pixelAligned) {
    return state.rect.pixelAligned(f);
  }
  return f;
};
