import { use } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { GraphState, LinkKey } from "@graph-state/core";
import { useReadVariable } from "@/shared/hooks/useReadVariable.ts";

export const useLayerVariableValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager?: GraphState
) => {
  // const { layerKey: instanceLayerKey, parentManager: instanceManager } =
  //   use(InstanceContext);
  const { manager: fragmentManager } = use(FragmentContext);
  const resultManager = manager ?? fragmentManager;
  const [layerValue, updateValue, layerInfo] = useLayerValue(
    layerKey,
    fieldKey,
    resultManager
  );
  const { value: instanceValue } = useReadVariable(
    layerInfo?.isVariable ? layerValue : null
  );
  // const [instanceValue] = useInstancePropertyValue(
  //   instanceLayerKey && isVariable ? resultManager : null,
  //   instanceLayerKey,
  //   layerValue
  // );

  return [
    layerInfo?.isVariable ? instanceValue : layerValue,
    updateValue,
    {
      ...layerInfo,
      rawValue: layerValue,
    },
  ];
};
