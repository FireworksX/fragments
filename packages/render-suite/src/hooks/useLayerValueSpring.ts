import { GraphState, LinkKey } from "@graph-state/core";
import { SpringValue } from "@react-spring/web";
import { useCallback, useMemo, useState } from "react";
import { debounce, noop } from "@fragmentsx/utils";
import { isVariableLink } from "@fragmentsx/definition";
import {
  getOverrider,
  isInheritField,
  getNormalizeLayer,
} from "@fragmentsx/render-react";

interface Options<T> {
  layerKey: LinkKey;
  fieldKey: string;
  initialValue: T;
  manager: GraphState;
  onFinish?: (value: T) => void;
  onChange?: (value: T) => void;
}

const springFields = {
  top: { defaultValue: 0 },
  left: { defaultValue: 0 },
  bottom: { defaultValue: 0 },
  right: { defaultValue: 0 },
  centerAnchorX: {},
  centerAnchorY: {},
  opacity: {},
  width: {},
  height: {},
  solidFill: {},
  layerGap: {},
  minWidth: { defaultValue: 0 },
  minHeight: { defaultValue: 0 },
  maxWidth: { defaultValue: 0 },
  maxHeight: { defaultValue: 0 },
};

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
  const springable = fieldKey in springFields;
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

      const { layer: normalizedLayer } = getNormalizeLayer(layerKey, manager);

      const debounceValue = debounce(onFinish ?? noop, 100);
      const defaultValue =
        initialValue ??
        normalizedLayer?.[fieldKey] ??
        springFields?.[fieldKey]?.defaultValue;

      // if (!defaultValue) {
      //   console.error(
      //     `[Use Spring Value]: Cannot set default value for ${fieldKey}`
      //   );
      // }

      if (layerKey) {
        const springValue = new SpringValue(defaultValue, {
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
  }, [cacheKey, initialValue, isInherit, layerKey]);

  const value$ = useMemo(() => getValue$(), [cacheKey, initialValue]);

  const updateValue = useCallback(
    (nextValue: T, ...args) => {
      if (layerKey) {
        const target$ = getValue$();

        if (
          springable &&
          !isVariableLink(nextValue) &&
          !isInherit &&
          target$ instanceof SpringValue
        ) {
          target$.set(nextValue);
        } else {
          onFinish?.(nextValue, ...args);
        }
      }
    },
    [onFinish, getValue$]
  );

  return [value$, updateValue] as const;
};
