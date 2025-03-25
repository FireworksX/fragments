import { isHtmlContent, isHTMLNode, isInstanceOf } from "@graph-state/checkers";
import { Interpolation, SpringValue } from "@react-spring/web";

export const skips = [
  isHtmlContent,
  isHTMLNode,
  (field) => typeof field === "string" && field.startsWith("$$"),
  isInstanceOf(SpringValue),
  isInstanceOf(Interpolation),
];
