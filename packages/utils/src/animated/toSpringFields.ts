import { SpringValue } from "@react-spring/core";
import { isPrimitive } from "src";

export const toSpringFields = (input: Record<string, any>) => {
  if (!input) return input;
  return Object.entries(input).reduce((acc, [key, value]) => {
    acc[key] = isPrimitive(value) ? new SpringValue(value) : value;
    return acc;
  }, {});
};
