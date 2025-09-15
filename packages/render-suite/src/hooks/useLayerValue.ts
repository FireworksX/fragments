import { GraphState, LinkKey } from "@graph-state/core";
import {
  FragmentContext,
  useLayerValue as useLayerValueCore,
} from "@fragmentsx/render-react";
import { useLayerValueSpring } from "@/hooks/useLayerValueSpring";
import { useContext, useEffect } from "react";

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

  const [value$, setValue$] = useLayerValueSpring({
    layerKey,
    fieldKey,
    initialValue: coreValue,
    manager: resultManager,
    onFinish: setCoreValue,
    onChange: (value) => options?.onChange?.(value),
  });

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
      value$,
    },
  ];
};
