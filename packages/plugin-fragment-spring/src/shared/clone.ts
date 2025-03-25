import { isObject, isPrimitive } from "@fragments/utils";
import { SpringValue } from "@fragments/springs-factory";
import { Interpolation } from "@react-spring/web";

export const clone = (input, result = {}) => {
  if (isPrimitive(input)) {
    return input;
  }

  if (input instanceof SpringValue || input instanceof Interpolation) {
    return input.toJSON();
  }

  if (isObject(input)) {
    Object.entries(input).forEach(([key, value]) => {
      result[key] = clone(value);
    });
  }

  return result;
};
