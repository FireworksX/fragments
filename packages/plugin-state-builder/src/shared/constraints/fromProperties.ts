import { isFiniteNumber, valueToDimensionType } from "@fragments/utils";
import { animatableValue } from "@/shared/animatableValue.ts";

export const fromProperties = (props) => {
  {
    const {
      left,
      right,
      top,
      bottom,
      width,
      height,
      centerX,
      centerY,
      aspectRatio,
      autoSize,
    } = props;
    const constraints = {
      left: isFiniteNumber(left) || animatableValue(left),
      right: isFiniteNumber(right) || animatableValue(right),
      top: isFiniteNumber(top) || animatableValue(top),
      bottom: isFiniteNumber(bottom) || animatableValue(bottom),
      widthType: valueToDimensionType(width),
      heightType: valueToDimensionType(height),
      aspectRatio: aspectRatio || null,
      fixedSize: autoSize === true,
    };
    let widthValue = null;
    let heightValue = null;
    let widthType = 0; /* FixedNumber */
    let heightType = 0; /* FixedNumber */
    if (
      constraints.widthType !== 0 /* FixedNumber */ &&
      typeof width === "string"
    ) {
      const parsedWidth = parseFloat(width);
      if (width.endsWith("fr")) {
        widthType = 3; /* FractionOfFreeSpace */
        widthValue = parsedWidth;
      } else if (width === "auto") {
        widthType = 2; /* Auto */
      } else {
        widthType = 1; /* Percentage */
        widthValue = parsedWidth / 100;
      }
    } else if (width !== void 0 && typeof width !== "string") {
      widthValue = isFiniteNumber(width);
    }
    if (
      constraints.heightType !== 0 /* FixedNumber */ &&
      typeof height === "string"
    ) {
      const parsedHeight = parseFloat(height);
      if (height.endsWith("fr")) {
        heightType = 3; /* FractionOfFreeSpace */
        heightValue = parsedHeight;
      } else if (height === "auto") {
        heightType = 2; /* Auto */
      } else {
        heightType = 1; /* Percentage */
        heightValue = parseFloat(height) / 100;
      }
    } else if (height !== void 0 && typeof height !== "string") {
      heightValue = animatableValue(height);
    }
    let centerAnchorX = 0.5;
    let centerAnchorY = 0.5;
    if (centerX) {
      centerAnchorX = parseFloat(centerX) / 100;
    }
    if (centerY) {
      centerAnchorY = parseFloat(centerY) / 100;
    }
    return {
      left: constraints.left ? animatableValue(left) : null,
      right: constraints.right ? animatableValue(right) : null,
      top: constraints.top ? animatableValue(top) : null,
      bottom: constraints.bottom ? animatableValue(bottom) : null,
      widthType,
      heightType,
      width: widthValue,
      height: heightValue,
      aspectRatio: constraints.aspectRatio || null,
      centerAnchorX,
      centerAnchorY,
    };
  }
};
