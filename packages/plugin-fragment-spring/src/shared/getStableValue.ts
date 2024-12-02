// Универсальная функция для получения стабильного значения
import { BaseNode } from "@/types";
import { GraphState } from "@graph-state/core";
import { isFieldOverridden } from "@/shared/isFieldOverridden.ts";
import { Interpolation, SpringValue } from "@react-spring/web";
import { isObject, isValue } from "@fragments/utils";
import { deepMergeObjects } from "@fragments/plugin-fragment";

export function getStableValue<T>(
  node: BaseNode,
  field: string,
  defaultValue: T,
  cache: GraphState
): SpringValue<T> | null {
  // Проверяем, перезаписывается ли поле
  if (isFieldOverridden(node, field, cache)) {
    return null; // Если поле перезаписывается, возвращаем null
  }

  const currentValue = (node as any)[field];

  if (isValue(currentValue)) {
    if (
      currentValue instanceof SpringValue ||
      currentValue instanceof Interpolation
    ) {
      return currentValue;
    }

    // Если значение отсутствует, возвращаем defaultValue
    if (typeof defaultValue === "object" && defaultValue !== null) {
      if (Array.isArray(defaultValue)) {
        // Если defaultValue — массив, создаём копию
        return [
          ...defaultValue.map((v) => new SpringValue(v)),
        ] as SpringValue<T>;
      }
      // Если defaultValue — объект, создаём глубокую копию с рекурсией
      return deepMergeObjects({}, defaultValue) as SpringValue<T>;
    }

    return new SpringValue(defaultValue);
  }

  if (isObject(currentValue) && isObject(defaultValue)) {
    // Если оба значения — объекты, объединяем их с рекурсией
    return deepMergeObjects(defaultValue, currentValue) as T;
  }

  // Если значение есть, возвращаем его
  return isValue(defaultValue)
    ? (new SpringValue(defaultValue) as T)
    : defaultValue;
}
