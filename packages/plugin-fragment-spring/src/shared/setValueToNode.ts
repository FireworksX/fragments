import { GraphState } from "@graph-state/core";
import { isVariableLink } from "@/shared/isVariableLink.ts";
import { isComputedValueLink } from "@/shared/isComputedValueLink.ts";
import { BaseNode } from "@/types";
import { Interpolation } from "@react-spring/web";
import { SpringValue } from "@fragments/springs-factory";

const defaultOptions = {
  staticValue: false,
};

export function setValueToNode<T extends BaseNode>(
  node: T,
  field: string,
  value: unknown,
  cache: GraphState,
  inputOptions = {}
) {
  const options = { ...defaultOptions, ...inputOptions };
  const nodeKey = cache.keyOfEntity(node);
  const isVariableValue = isVariableLink(value) || isComputedValueLink(value);

  if (isVariableValue) {
    cache.mutate(nodeKey, (current) => {
      /*
        Если меняем одну переменную на другую переменную, то в
        _${field} всегда должно оставаться изначальное значение
         */
      const saveValue = isVariableLink(current[field])
        ? current[`_${field}`]
        : current[field];
      return {
        [field]: value,
        [`_${field}`]: saveValue,
      };
    });
    return;
  }

  const resolveValue = (cache.resolve(node) ?? node)[field];

  if (value instanceof Interpolation) {
    cache.mutate(nodeKey, {
      [field]: value,
    });
  } else if (resolveValue && resolveValue instanceof SpringValue) {
    resolveValue.set(value);
  } else {
    cache.mutate(nodeKey, {
      [field]: options?.staticValue ? value : new SpringValue(value),
    });
  }
}
