import { useCallback, useContext } from "preact/compat";
import { useGraph } from "@graph-state/react";
import { Graph, GraphState, LinkKey, MutateOptions } from "@graph-state/core";
import { get, omit, pick, set } from "@fragmentsx/utils";
import { parseLayerField, isVariableLink } from "@fragmentsx/definition";
import { useNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { isInheritField, isPartOfPrimary } from "@/shared/helpers";
import { useLayerCssVariable } from "@/shared/hooks/useLayerCssVariable";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

interface Options {
  manager?: GraphState;
}

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  options?: Options
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = options?.manager ?? fragmentManager;
  const key = layerKey;
  const [, updateLayerData] = useGraph(resultManager, key, {
    // selector: (data) => (data ? pick(data, fieldKey) : data),
  });

  const { layer, rawLayer } = useNormalizeLayer(key, resultManager);
  const rawValue = get(rawLayer, fieldKey);
  const layerValue = get(layer, fieldKey);

  const { value: variableValue } = useReadVariable(layerValue);
  const currentValue = variableValue ?? layerValue;

  const isInherit = isInheritField(resultManager, key, fieldKey);
  const isOverride = !isInherit && !isPartOfPrimary(resultManager, key);

  const resetOverride = useCallback(() => {
    // TODO Добавить в updateLayerData возможность передать replace: true
    // TODO Сейчас если удалить свойство из объекта, не будет реакции, нужно править selector
    resultManager.mutate(
      layerKey,
      (prev) => {
        const r = omit(prev, fieldKey);

        return r;
      },
      { replace: true }
    );
  }, [updateLayerData]);

  const restore = useCallback(
    (fallbackValue: unknown) => {
      const tempValue = resultManager.resolve(resultManager?.$fragment?.temp)?.[
        layerKey
      ]?.[fieldKey];

      updateLayerData({ [fieldKey]: tempValue ?? fallbackValue });
    },
    [updateLayerData, resultManager]
  );

  const updateValue = useCallback(
    (value: unknown, options?: MutateOptions) => {
      const { success, output } = parseLayerField(layer, fieldKey, value);

      console.log(fieldKey, value);

      if (success) {
        if (isVariableLink(value)) {
          /*
          Если меняем значение на переменную, то сохраняем значение, чтобы
          можно было вызвать restore и восстановить значение, которое
          было до установки переменной
           */
          resultManager.mutate(resultManager?.$fragment?.temp, {
            [layerKey]: {
              [fieldKey]: currentValue,
            },
          });

          resultManager.resolve(resultManager?.$fragment?.temp);
        }

        updateLayerData((prev) => {
          set(prev, fieldKey, output);
          return prev;
        }, options);
      }
    },
    [layer, fieldKey, updateLayerData, resultManager, layerKey, currentValue]
  );

  const { value: cssValue } = useLayerCssVariable(rawValue ?? layerValue);

  return [
    currentValue,
    updateValue,
    {
      isOverride,
      resetOverride,
      isVariable: isVariableLink(rawValue ?? layerValue),
      cssVariableValue: cssValue ?? currentValue,
      rawValue,
      restore,
      ...resultManager.entityOfKey(key),
    },
  ];
};
