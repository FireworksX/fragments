import { parseCssSpacing } from "@/shared/cssSpacingParser.ts";

export const isMixedCornerRadius = (radius: string) => {
  const values = Object.values(parseCssSpacing(radius));
  return new Set(values).size !== values.length;
};
