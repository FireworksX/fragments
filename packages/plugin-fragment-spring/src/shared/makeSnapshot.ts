import { GraphState, LinkKey } from "@graph-state/core";
import { Interpolation, SpringValue } from "@react-spring/web";
import { isPrimitive, isValue } from "@fragments/utils";

export function makeSnapshot(cache: GraphState, target: LinkKey) {
  if (!target) return [];

  const result: unknown[] = [];

  const getJson = (value: unknown) => {
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
        acc[key] = value.map(getJson);
      }

      return acc;
    }, {});
  };

  result.push(getJson(cache.resolve(target)));

  const children = cache.cache.getChildren(target);
  if (Array.isArray(children)) {
    children.forEach((child) => {
      result.push(...makeSnapshot(cache, child));
    });
  }

  return result;
}
