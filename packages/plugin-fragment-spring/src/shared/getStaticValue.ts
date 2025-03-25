import { isFieldOverridden } from "@/shared/isFieldOverridden.ts";
import { animatableValue } from "@/shared/animatableValue.ts";

export const getStaticValue = (node, field, defaultValue, cache) => {
  if (isFieldOverridden(node, field, cache)) {
    return null; // Если поле перезаписывается, возвращаем null
  }

  const currentValue = (node as any)[field];
  return animatableValue(currentValue) ?? defaultValue;
};
