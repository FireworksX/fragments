import { isHtmlContent, isHTMLNode } from "@graph-state/checkers";

export const skips = [
  isHtmlContent,
  isHTMLNode,
  (field) => typeof field === "string" && field.startsWith("$$"),
];
