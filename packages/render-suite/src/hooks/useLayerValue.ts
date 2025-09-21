import { GraphState, LinkKey } from "@graph-state/core";
import {
  FragmentContext,
  useLayerValue as useLayerValueCore,
} from "@fragmentsx/render-react";
import { useLayerValueSpring } from "@/hooks/useLayerValueSpring";
import { useCallback, useContext, useEffect, useRef } from "react";
import { debounce, noop } from "@fragmentsx/utils";

export interface UseLayerValueOptions {
  onChange?: (value: unknown) => void;
  manager?: GraphState;
}

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  options?: UseLayerValueOptions
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = options?.manager ?? fragmentManager;

  const [coreValue, setCoreValue, coreInfo] = useLayerValueCore(
    layerKey,
    fieldKey,
    {
      manager: resultManager,
    }
  );

  const [value$, setValue$, patchUpdate] = useLayerValueSpring({
    layerKey,
    fieldKey,
    initialValue: coreValue,
    manager: resultManager,
    onFinish: setCoreValue,
    onChange: (value) => options?.onChange?.(value),
  });

  const debouncePatch = debounce(patchUpdate ?? noop, 200);

  const setWithAutoPatch = useCallback(
    (...args) => {
      setValue$(...args);
      debouncePatch();
    },
    [setValue$, patchUpdate]
  );

  useEffect(() => {
    if (
      !coreInfo.isVariable &&
      !!value$?.get() &&
      !!coreValue &&
      value$?.get() !== coreValue
    ) {
      setValue$(coreValue);
    }
  }, [coreValue, coreInfo.isVariable]);

  return [
    coreValue,
    setValue$,
    {
      ...coreInfo,
      resultValue: coreInfo.isVariable || !value$ ? coreValue : value$,
      patchUpdate,
      setWithAutoPatch,
      value$,
    },
  ];
};
