import { Interpolation, SpringValue } from "@react-spring/web";
import { isPrimitive, isValue } from "@fragments/utils";

export function toJsonNode(value: any) {
  if (value instanceof SpringValue || value instanceof Interpolation) {
    return value.toJSON();
  }
  if (isPrimitive(value) && isValue(value)) {
    return value;
  }

  return Object.entries(value).reduce((acc, [key, value]) => {
    if (value instanceof SpringValue || value instanceof Interpolation) {
      acc[key] = value.toJSON();
    }

    if (isPrimitive(value) && isValue(value)) {
      acc[key] = value;
    }

    if (Array.isArray(value)) {
      acc[key] = value.map(toJsonNode);
    }

    return acc;
  }, {});
}
