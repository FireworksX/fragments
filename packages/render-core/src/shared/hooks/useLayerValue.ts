import { useCallback, useContext } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragmentsx/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { getOverrider } from "@/shared/helpers";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { useNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";

/**
 * Этот хук обслуживает логику получения и изменения значения.
 * Принимает слой и его поле с которым будем работать.
 * При изменении значения валидирует поле, если пытаемся установить
 * не валидные данные, то обновление будет пропущено.
 */

export const useLayerValue = (layerKey: LinkKey, fieldKey: string) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = fragmentManager;
  const { layer: normalizeLayer } = useNormalizeLayer(layerKey);

  const [layerData, updateLayerData] = useGraph(resultManager, layerKey, {
    selector: (data) => (data ? pick(data, fieldKey) : data),
  });

  let currentValue = normalizeLayer?.[fieldKey];
  const rawValue = layerData?.[fieldKey];

  const { value: variableValue } = useReadVariable(rawValue);

  const updateValue = useCallback(
    (value: unknown) => {
      updateLayerData({ [fieldKey]: value });
    },
    [updateLayerData, fieldKey, currentValue]
  );

  currentValue = variableValue ?? currentValue;

  return [
    currentValue,
    updateValue,
    {
      isVariable: false,
    },
  ];
};
