import { BaseNode } from "@/types";
import { GraphState } from "@graph-state/core";
import { isValue } from "@fragments/utils";
import { isVariableLink } from "@/shared/isVariableLink.ts";
import { getKey } from "@/shared/index.ts";
import { getOverrideFrom } from "@/shared/getOverrideFrom.ts";

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

  const overrideFrom = getOverrideFrom(node, cache);

  // Если есть overrideFrom, проверяем родителя
  if (overrideFrom) {
    const parentNode = cache.resolve(overrideFrom);

    if (parentNode) {
      return getFieldValue(parentNode, field, cache);
    }

    // Рекурсивно вызываем для родительского узла
  }

  // Если цепочка закончилась и значение не найдено, возвращаем undefined
  return null;
}
