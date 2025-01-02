// Вспомогательная функция для проверки, перезаписывается ли поле в цепочке overrideFrom
import { BaseNode } from "@/types";
import { isBrowser, isValue } from "@fragments/utils";
import { GraphState } from "@graph-state/core";
import { getOverrideFrom } from "@/shared/getOverrideFrom.ts";
import { getKey } from "@/shared/index.ts";

export function isFieldOverridden<T extends BaseNode>(
  node: T,
  field: string,
  cache: GraphState
): boolean {
  const overrideFrom = getOverrideFrom(node, cache);
  // Проверяем значение поля в текущем узле
  const value = (node as any)[field];

  // Если значение существует в текущем узле, оно не перезаписывается
  // Если нет overrideFrom, то поле не перезаписывается
  if (isValue(value) || !overrideFrom) {
    return false;
  }

  // Проверяем всю цепочку родителей
  let currentOverrideFrom = overrideFrom;
  while (currentOverrideFrom) {
    const parentNode: BaseNode = cache.resolve(currentOverrideFrom) as BaseNode;
    if (parentNode) {
      // Проверяем значение поля у текущего родителя
      const parentValue = (parentNode as any)[field];
      if (isValue(parentValue)) {
        return true; // Поле найдено в цепочке родителей
      }

      // Переходим к следующему родителю
      currentOverrideFrom = getOverrideFrom(parentNode, cache);
    }
  }

  // Если не найдено ни одного значения в цепочке, поле не перезаписывается
  return false;
}
