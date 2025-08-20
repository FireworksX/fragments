import { GraphState, LinkKey } from "@graph-state/core";
import { SpringValue } from "@react-spring/web";
import { useCallback, useMemo, useState } from "react";
import { debounce, noop } from "@fragmentsx/utils";
import { isVariableLink } from "@fragmentsx/definition";
import { getOverrider, isInheritField } from "@fragmentsx/render-react";

interface Options<T> {
  layerKey: LinkKey;
  fieldKey: string;
  initialValue: T;
  manager: GraphState;
  onFinish?: (value: T) => void;
  onChange?: (value: T) => void;
}

const springFields = [
  "top",
  "left",
  "opacity",
  "width",
  "height",
  "solidFill",
  "layerGap",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
];

export const useLayerValueSpring = <T>({
  layerKey,
  initialValue,
  fieldKey,
  manager,
  onFinish,
  onChange,
}: Options<T>) => {
  if (manager && !manager?.springsCache) {
    manager.springsCache = new Map();
  }
  const cache = manager?.springsCache;

  const getCacheKey = (layerKey, fieldKey) => `${layerKey}_${fieldKey}`;
  const cacheKey = getCacheKey(layerKey, fieldKey);
  const springable = springFields.includes(fieldKey);
  const isInherit = isInheritField(manager, layerKey, fieldKey);

  const getValue$ = useCallback(() => {
    const overrider = getOverrider(manager, layerKey);
    /**
     * Смотрим, перезаписывается ли сейчас значение, если да,
     * то возвращаем SpringValue от того слоя, кто перезаписывает.
     */
    const overrideCacheKey = isInherit
      ? getCacheKey(manager.keyOfEntity(overrider), fieldKey)
      : null;

    if (springable && !isVariableLink(initialValue)) {
      if (overrideCacheKey && cache?.has(overrideCacheKey)) {
        return cache?.get(overrideCacheKey);
      }

      if (cache?.has(cacheKey)) {
        return cache?.get(cacheKey);
      }

      const debounceValue = debounce(onFinish ?? noop, 100);

      if (layerKey) {
        const springValue = new SpringValue(initialValue, {
          onChange: (value) => {
            onChange?.(value);
            debounceValue(value);
          },
        });
        cache?.set(cacheKey, springValue);
        return springValue;
      }
    }

    return null;
  }, [cacheKey, initialValue, isInherit]);

  const value$ = useMemo(() => getValue$(), [cacheKey, initialValue]);

  const updateValue = useCallback(
    (nextValue: T) => {
      if (layerKey) {
        const target$ = getValue$();
        if (springable && !isVariableLink(nextValue) && !isInherit) {
          target$.set(nextValue);
        } else {
          onFinish?.(nextValue);
        }
      }
    },
    [onFinish, getValue$]
  );

  return [value$, updateValue] as const;
};
