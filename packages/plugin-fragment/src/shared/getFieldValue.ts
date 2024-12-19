import { BaseNode } from "@/types";
import { GraphState } from "@graph-state/core";
import { isValue } from "@fragments/utils";
import { isVariableLink } from "@/shared/isVariableLink.ts";

export function getFieldValue<N extends BaseNode>(
  node: N,
  field: string,
  cache: GraphState
): any {
  // Получаем значение поля в текущем узле
  const resolvedNode = cache.resolve(node as any);
  const currentValue = resolvedNode?.[field];

  // Если значение существует, возвращаем его
  if (isValue(currentValue)) {
    if (isVariableLink(currentValue)) {
      return cache.resolve(currentValue)?.getValue?.() ?? currentValue;
    }

    return currentValue;
  }

  // Если есть overrideFrom, проверяем родителя
  if (resolvedNode?.overrideFrom) {
    const parentNode = cache.resolve(resolvedNode.overrideFrom);

    if (parentNode) {
      return getFieldValue(parentNode, field, cache);
    }

    // Рекурсивно вызываем для родительского узла
  }

  // Если цепочка закончилась и значение не найдено, возвращаем undefined
  return null;
}
