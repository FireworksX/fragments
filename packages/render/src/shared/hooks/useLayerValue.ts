import { useCallback, useContext } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragments/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { getOverrider } from "@/shared/helpers";
import { useReadVariable } from "@/shared/hooks/useReadVariable";

/**
 * Этот хук обслуживает логику получения и изменения значения.
 * Принимает слой и его поле с которым будем работать.
 * При изменении значения валидирует поле, если пытаемся установить
 * не валидные данные, то обновление будет пропущено.
 */

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  fallbackValue?: unknown
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = fragmentManager;
  const overrider = getOverrider(resultManager, layerKey);

  const [layerData, updateLayerData] = useGraph(resultManager, layerKey, {
    selector: (data) => (data ? pick(data, fieldKey) : data),
  });

  let currentValue = layerData?.[fieldKey] ?? overrider?.[fieldKey];

  const { value: variableValue } = useReadVariable(currentValue);

  const updateValue = useCallback(
    (value: unknown) => {
      updateLayerData({ [fieldKey]: value });
    },
    [updateLayerData, fieldKey, currentValue]
  );

  currentValue = variableValue ?? currentValue ?? fallbackValue;

  return [
    currentValue,
    updateValue,
    {
      isVariable: false,
    },
  ];
};
