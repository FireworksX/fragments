import { useCallback } from "preact/compat";
import { useGraph } from "@graph-state/react";
import { GraphState, LinkKey } from "@graph-state/core";
import { pick } from "@fragmentsx/utils";
import { parseLayerField, isVariableLink } from "@fragmentsx/definition";
import { useNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { isInheritField, isPartOfPrimary } from "@/shared/helpers";

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager: GraphState
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

  const { value: variableValue } = useReadVariable(layerValue);
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

  return [
    currentValue,
    updateValue,
    {
      isOverride,
      resetOverride,
      isVariable: isVariableLink(rawValue),
      rawValue,
      restore,
      ...resultManager.entityOfKey(key),
    },
  ];
};
