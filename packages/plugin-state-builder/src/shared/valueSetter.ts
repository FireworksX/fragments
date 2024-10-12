import { GraphState, LinkKey } from "@graph-state/core";
import { isVariableLink } from "@/shared/isVariableLink.ts";
import { isComputedValueLink } from "@/shared/isComputedValueLink.ts";
import { Interpolation, SpringValue } from "@react-spring/web";

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

    const resolveValue = state.resolve(entityLinkKey)[fieldKey];

    if (value instanceof Interpolation) {
      state.mutate(entityLinkKey, {
        [fieldKey]: value,
      });
    } else if (resolveValue && resolveValue instanceof SpringValue) {
      resolveValue.set(value);
    } else {
      state.mutate(entityLinkKey, {
        [fieldKey]: new SpringValue(value),
      });
    }
  };
