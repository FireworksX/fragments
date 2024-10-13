import { createConstants } from "@fragments/utils";

export const $EXTENDED: unique symbol = Symbol("extended");

export const nodes = createConstants(
  "Fragment",
  "Breakpoint",
  "Frame",
  "Text",
  "SolidPaintStyle",
  "CssLink",
  "Property",
  "ComputedValue",
  "TransformValue"
);

export const borderType = createConstants("None", "Solid", "Dashed", "Dotted");
export const paintMode = createConstants("Solid", "Image");
export const imagePaintScaleModes = createConstants(
  "Fill",
  "Fit",
  "Crop",
  "Tile"
);
export const constrain = createConstants(
  "Min",
  "Center",
  "Max",
  "Stretch",
  "Scale"
);
export const positionType = createConstants("absolute", "relative");
export const sizing = createConstants("Fixed", "Hug", "Fill", "Relative");
export const layerMode = createConstants("none", "flex");
export const layerDirection = createConstants("vertical", "horizontal");
export const layerAlign = createConstants("start", "center", "end");
export const layerDistribute = createConstants(
  "start",
  "center",
  "end",
  "space-between",
  "space-around"
);
export const textTransform = createConstants(
  "none",
  "uppercase",
  "lowercase",
  "capitalize"
);
export const textDecorations = createConstants(
  "none",
  "underline",
  "line-through"
);
export const effectType = createConstants("loop", "appear", "hover", "tap");
export const effectName = createConstants(
  "fade",
  "slide",
  "bounce",
  "wiggle",
  "increase"
);
export const propertyType = createConstants(
  "String",
  "Boolean",
  "Array",
  "Color",
  "ComponentInstance",
  "Date",
  "Enum",
  "Number",
  "Object"
);

export const variableTransforms = createConstants(
  "convert",
  "exists",
  "equals",
  "startWith",
  "endWith",
  "contains",
  "dateBefore",
  "dateAfter",
  "dateBetween",
  "feature",
  "notFeature",
  "gt", // Greater than
  "gte", // Greater than or equals
  "lt", // Less than
  "lte", // Less than or equals,
  "convertFromBoolean",
  "negative"
);

export const renderTarget = createConstants("canvas", "document");

export const renderMode = createConstants("viewport", "parent", "fixed");
