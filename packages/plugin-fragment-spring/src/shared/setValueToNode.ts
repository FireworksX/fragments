import { GraphState } from "@graph-state/core";
import { isVariableLink } from "@/shared/isVariableLink.ts";
import { isComputedValueLink } from "@/shared/isComputedValueLink.ts";
import { BaseNode } from "@/types";
import { Interpolation, SpringValue } from "@react-spring/web";

export function setValueToNode<T extends BaseNode>(
  node: T,
  field: string,
  value: unknown,
  cache: GraphState
) {
  // const isVariableValue = isVariableLink(value) || isComputedValueLink(value);

  // if (isVariableValue) {
  //   state.mutate(entityLinkKey, (current) => {
  //     /*
  //       Если меняем одну переменную на другую переменную, то в
  //       _${field} всегда должно оставаться изначальное значение
  //        */
  //     const saveValue = isVariableLink(current[fieldKey])
  //       ? current[`_${fieldKey}`]
  //       : current[fieldKey];
  //     return {
  //       [fieldKey]: value,
  //       [`_${fieldKey}`]: saveValue,
  //     };
  //   });
  //   return;
  // }

  const resolveValue = (cache.resolve(node) ?? node)[field];
  const nodeKey = cache.keyOfEntity(node);

  if (value instanceof Interpolation) {
    cache.mutate(nodeKey, {
      [field]: value,
    });
  } else if (resolveValue && resolveValue instanceof SpringValue) {
    resolveValue.set(value);
  } else {
    cache.mutate(nodeKey, {
      [field]: new SpringValue(value),
    });
  }
}
