import { GraphState, LinkKey } from "@graph-state/core";
import { useLayerValue as useLayerValueCore } from "@fragmentsx/render-react";
import { useLayerValueSpring } from "@/hooks/useLayerValueSpring";
import { useEffect } from "react";

export interface UseLayerValueOptions {
  onChange?: (value: unknown) => void;
}

export const useLayerValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager: GraphState,
  options?: UseLayerValueOptions
) => {
  const [coreValue, setCoreValue, coreInfo] = useLayerValueCore(
    layerKey,
    fieldKey,
    manager
  );

  const [value$, setValue$] = useLayerValueSpring({
    layerKey,
    fieldKey,
    initialValue: coreValue,
    manager,
    onFinish: setCoreValue,
    onChange: (value) => options?.onChange?.(value),
  });

  useEffect(() => {
    setValue$(coreValue);
  }, [coreValue]);

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
