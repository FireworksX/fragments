import { useCallback, useContext, useEffect, useMemo } from "react";
import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragments/utils";
import { isVariableLink } from "@/lib/zod.ts";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayer } from "@/shared/hooks/useLayer.ts";

/**
 * Этот хук обслуживает логику получения и изменения значения.
 * Принимает слой и его поле с которым будем работать.
 * При изменении значения валидирует поле, если пытаемся установить
 * не валидные данные, то обновление будет пропущено.
 */

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager?: GraphState
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = manager ?? fragmentManager;
  const [_, updateLayerData] = useGraph(resultManager, layerKey, {
    selector: (data) => (data ? pick(data, fieldKey) : data),
  });

  const { layer, schema } = useLayer(layerKey, resultManager);
  const currentValue = layer?.[fieldKey];

  const restore = useCallback(() => {
    const tempValue = resultManager.resolve(resultManager?.$fragment?.temp)?.[
      layerKey
    ]?.[fieldKey];

    if (tempValue) {
      updateLayerData({ [fieldKey]: tempValue });
    }
  }, [updateLayerData, resultManager]);

  const updateValue = useCallback(
    (inputValue: unknown) => {
      let value = inputValue;
      if (typeof value === "function") {
        value = value(currentValue);
      }

      const schemaField = schema?.shape?.[fieldKey];
      const { success: isValid } = schemaField?.safeParse(value) ?? {};

      if (isValid) {
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

        updateLayerData({ [fieldKey]: value });
      }
    },
    [schema, updateLayerData, fieldKey, currentValue]
  );

  return [
    currentValue,
    updateValue,
    {
      isVariable: isVariableLink(currentValue),
      restore,
    },
  ];
};
