import { useCallback, useContext } from "preact/compat";
import { useGraph } from "@graph-state/react";
import {
  Graph,
  GraphState,
  keyOfEntity,
  LinkKey,
  MutateOptions,
} from "@graph-state/core";
import { get, omit, pick, set } from "@fragmentsx/utils";
import { parseLayerField, isVariableLink } from "@fragmentsx/definition";
import { useNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { isInheritField, isPartOfPrimary } from "@/shared/helpers";
import { useLayerCssVariable } from "@/shared/hooks/useLayerCssVariable";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { GetLayerOptions } from "./useNormalizeLayer/getLayer";
import { layerFieldSetter } from "@/shared/helpers/layerValue/layerFieldSetter";

interface Options extends GetLayerOptions {
  manager?: GraphState;
}

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  options?: Options
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = options?.manager ?? fragmentManager;
  const key = keyOfEntity(layerKey);
  const [, updateLayerData] = useGraph(resultManager, key, {
    // selector: (data) => (data ? pick(data, fieldKey) : data),
  });

  const { layer, rawLayer } = useNormalizeLayer(key, resultManager, options);
  const rawValue = get(rawLayer, fieldKey);
  const layerValue = get(layer, fieldKey);

  const { value: variableValue } = useReadVariable(layerValue);
  const currentValue = variableValue ?? layerValue;

  const isInherit = isInheritField(resultManager, key, fieldKey);
  const isOverride = !isInherit && !isPartOfPrimary(resultManager, key);

  const setter = layerFieldSetter(resultManager, key, fieldKey, currentValue);

  const resetOverride = useCallback(() => {
    // TODO Добавить в updateLayerData возможность передать replace: true
    // TODO Сейчас если удалить свойство из объекта, не будет реакции, нужно править selector
    resultManager.mutate(
      key,
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
        key
      ]?.[fieldKey];

      updateLayerData({ [fieldKey]: tempValue ?? fallbackValue });
    },
    [updateLayerData, resultManager]
  );

  const updateValue = useCallback(
    (value: unknown, options?: MutateOptions) => {
      setter(value, options);
    },
    [setter]
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
