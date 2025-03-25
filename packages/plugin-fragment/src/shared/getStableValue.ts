// Универсальная функция для получения стабильного значения
import { BaseNode } from "@/types";
import { GraphState } from "@graph-state/core";
import { isFieldOverridden } from "@/shared/isFieldOverridden.ts";
import { deepMergeObjects } from "@/shared/deepMergeObjexts.ts";

export function getStableValue<T>(
  node: BaseNode,
  field: string,
  defaultValue: T,
  cache: GraphState
): T | null {
  // Проверяем, перезаписывается ли поле
  if (isFieldOverridden(node, field, cache)) {
    return null; // Если поле перезаписывается, возвращаем null
  }

  const currentValue = (node as any)[field];

  if (currentValue === null || currentValue === undefined) {
    // Если значение отсутствует, возвращаем defaultValue
    if (typeof defaultValue === "object" && defaultValue !== null) {
      if (Array.isArray(defaultValue)) {
        // Если defaultValue — массив, создаём копию
        return [...defaultValue] as T;
      }
      // Если defaultValue — объект, создаём глубокую копию с рекурсией
      return deepMergeObjects({}, defaultValue) as T;
    }
    return defaultValue;
  }

  if (typeof currentValue === "object" && typeof defaultValue === "object") {
    // Если оба значения — объекты, объединяем их с рекурсией
    return deepMergeObjects(defaultValue, currentValue) as T;
  }

  // Если значение есть, возвращаем его
  return currentValue as T;
}
