import { to } from "@react-spring/core";

export const interpolationObject = (input: Record<string, any>) => {
  if (!input) return input;
  return to(Object.values(input), (...values) => {
    const keys = Object.keys(input);
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
  });
};
