import { useCallback, useContext } from "react";
import { useGraph } from "@graph-state/react";
import { GraphState, LinkKey } from "@graph-state/core";
import { noop, pick } from "@fragmentsx/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useNormalizeLayer } from "@/hooks/useNormalizeLayer";
import { isInheritField, isPartOfPrimary } from "@fragmentsx/render-core";
import { parseLayerField, isVariableLink } from "@fragmentsx/definition";
import { useLayerValueSpring } from "@/hooks/useLayerValueSpring";
import { useReadVariable } from "@/hooks/useReadVariable";

export interface UseLayerValueOptions {
  onChange?: (value: unknown) => void;
}

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager: GraphState,
  options?: UseLayerValueOptions
) => {
  // const { manager: resultManager } = useContext(FragmentContext);
  const resultManager = manager;
  const key = layerKey;
  const [, updateLayerData] = useGraph(resultManager, key, {
    selector: (data) => (data ? pick(data, fieldKey) : data),
  });

  const { layer, rawLayer } = useNormalizeLayer(key, resultManager);
  const rawValue = rawLayer?.[fieldKey];
  const layerValue = layer?.[fieldKey];

  const { value: variableValue, layer: vvv } = useReadVariable(layerValue);
  const currentValue = variableValue ?? layerValue;

  const isInherit = isInheritField(resultManager, key, fieldKey);
  const isOverride = !isInherit && !isPartOfPrimary(resultManager, key);
  const resetOverride = useCallback(() => updateLayerData(null), []);

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
    (value: unknown) => {
      const { success, output } = parseLayerField(layer, fieldKey, value);

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

        updateLayerData({ [fieldKey]: output });
      }
    },
    [layer, fieldKey, updateLayerData, resultManager, layerKey, currentValue]
  );

  const [value$, setValue$] = useLayerValueSpring({
    layerKey,
    fieldKey,
    initialValue: currentValue,
    manager: resultManager,
    onFinish: updateValue,
    onChange: options?.onChange,
  });

  return [
    currentValue,
    setValue$,
    {
      isOverride,
      resetOverride,
      isVariable: isVariableLink(rawValue),
      resultValue: isVariableLink(rawValue) || !value$ ? currentValue : value$,
      rawValue,
      value$,
      restore,
      ...resultManager.entityOfKey(key),
    },
  ];
};
