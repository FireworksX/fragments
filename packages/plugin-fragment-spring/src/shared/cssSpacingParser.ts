import { fromPx, toPx } from "@/shared/pxFormat.ts";

interface SideSpacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const parseCssSpacing = (value: string): SideSpacing => {
  if (typeof value !== "string")
    return { top: 0, right: 0, bottom: 0, left: 0 };

  const parts = value.split(/\s+/); // Split the string by spaces
  let top: number, right: number, bottom: number, left: number;

  switch (parts.length) {
    case 1:
      // Case: "10px" -> { top: 10px, right: 10px, bottom: 10px, left: 10px }
      top = right = bottom = left = fromPx(parts[0]);
      break;
    case 2:
      // Case: "20px 10px" -> { top: 20px, right: 10px, bottom: 20px, left: 10px }
      top = bottom = fromPx(parts[0]);
      right = left = fromPx(parts[1]);
      break;
    case 3:
      // Case: "20px 10px 5px" -> { top: 20px, right: 10px, bottom: 5px, left: 10px }
      top = fromPx(parts[0]);
      right = left = fromPx(parts[1]);
      bottom = fromPx(parts[2]);
      break;
    case 4:
      // Case: "20px 10px 5px 15px" -> { top: 20px, right: 10px, bottom: 5px, left: 15px }
      top = fromPx(parts[0]);
      right = left = fromPx(parts[1]);
      bottom = fromPx(parts[2]);
      left = fromPx(parts[3]);
      break;
    default:
      throw new Error(`Invalid CSS spacing value: ${value}`);
  }

  return { top, right, bottom, left };
};

export const stringifyCssSpacing = (values: SideSpacing): string => {
  const { top, right, bottom, left } = values;

  // If all sides are the same, return "10px"
  if (top === right && top === bottom && top === left) {
    return toPx(top);
  }

  // If top and bottom are the same, and right and left are the same, return "20px 10px"
  if (top === bottom && right === left) {
    return `${toPx(top)} ${toPx(right)}`;
  }

  // If top is unique, right/left are the same, and bottom is unique, return "20px 10px 5px"
  if (right === left) {
    return `${toPx(top)} ${toPx(right)} ${toPx(bottom)}`;
  }

  // If all values are unique, return "20px 10px 5px 15px"
  return `${toPx(top)} ${toPx(right)} ${toPx(bottom)} ${toPx(left)}`;
};
