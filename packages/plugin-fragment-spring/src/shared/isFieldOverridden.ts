// Вспомогательная функция для проверки, перезаписывается ли поле в цепочке overrideFrom
import { BaseNode } from "@/types";
import { isValue } from "@fragments/utils";
import { GraphState } from "@graph-state/core";
import { getKey } from "@/shared/index.ts";

export function isFieldOverridden<T extends BaseNode>(
  node: T,
  field: string,
  cache: GraphState
): boolean {
  // Проверяем значение поля в текущем узле
  const value = (node as any)[field];

  // Если значение существует в текущем узле, оно не перезаписывается
  // Если нет overrideFrom, то поле не перезаписывается
  if (isValue(value) || !node.overrideFrom) {
    return false;
  }

  // Проверяем всю цепочку родителей
  let currentOverrideFrom = getKey(node.overrideFrom);
  while (currentOverrideFrom) {
    const parentNode: BaseNode = cache.resolve(currentOverrideFrom) as BaseNode;
    if (parentNode) {
      // Проверяем значение поля у текущего родителя
      const parentValue = (parentNode as any)[field];
      if (isValue(parentValue)) {
        return true; // Поле найдено в цепочке родителей
      }

      // Переходим к следующему родителю
      currentOverrideFrom = getKey(parentNode.overrideFrom);
    }
  }

  // Если не найдено ни одного значения в цепочке, поле не перезаписывается
  return false;
}
