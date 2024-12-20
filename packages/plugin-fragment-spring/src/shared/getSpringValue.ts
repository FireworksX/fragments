// Универсальная функция для получения стабильного значения
import { BaseNode } from "@/types";
import { GraphState } from "@graph-state/core";
import { isFieldOverridden } from "@/shared/isFieldOverridden.ts";
import { Interpolation } from "@react-spring/web";
import { SpringValue } from "@fragments/springs-factory";
import { isObject, isValue } from "@fragments/utils";
import { deepMergeObjects } from "@fragments/plugin-fragment";
import { isVariableLink } from "@/shared/isVariableLink.ts";

export function getSpringValue<T>(
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
    if (isVariableLink(currentValue)) {
      return currentValue;
    }

    if (
      currentValue instanceof SpringValue ||
      currentValue instanceof Interpolation
    ) {
      return currentValue;
    }

    if (isObject(currentValue)) {
      return Object.entries(currentValue).reduce((acc, [key, value]) => {
        acc[key] = getSpringValue(currentValue, key, defaultValue[key], cache);
        return acc;
      }, {});
    }

    return new SpringValue(currentValue);
  }

  // Если значение есть, возвращаем его
  return isValue(defaultValue)
    ? (new SpringValue(defaultValue) as T)
    : defaultValue;
}
