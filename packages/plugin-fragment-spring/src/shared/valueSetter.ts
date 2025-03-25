import { GraphState, LinkKey } from "@graph-state/core";
import { isVariableLink } from "@/shared/isVariableLink.ts";
import { isComputedValueLink } from "@/shared/isComputedValueLink.ts";

export const valueSetter =
  (state: GraphState, entityLinkKey: LinkKey, fieldKey: string) =>
  <TValue = unknown | LinkKey>(value: TValue) => {
    const isVariableValue = isVariableLink(value) || isComputedValueLink(value);

    if (isVariableValue) {
      state.mutate(entityLinkKey, (current) => {
        /*
          Если меняем одну переменную на другую переменную, то в
          _${field} всегда должно оставаться изначальное значение
           */
        const saveValue = isVariableLink(current[fieldKey])
          ? current[`_${fieldKey}`]
          : current[fieldKey];
        return {
          [fieldKey]: value,
          [`_${fieldKey}`]: saveValue,
        };
      });
      return;
    }

    state.mutate(entityLinkKey, {
      [fieldKey]: value,
    });
  };
