import { use, useContext, useEffect, useMemo } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { isVariableLink } from "@/lib/zod.ts";
import { GraphState, LinkKey } from "@graph-state/core";
import { InstanceContext } from "@/components/Instance";
import { useInstancePropertyValue } from "@/shared/hooks/useInstancePropertyValue.ts";

export const useLayerVariableValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager?: GraphState
) => {
  const { layerKey: instanceLayerKey, manager: instanceManager } =
    use(InstanceContext);
  const { manager: fragmentManager } = use(FragmentContext);
  const resultManager = manager ?? fragmentManager;
  const [layerValue, updateValue, layerInfo] = useLayerValue(
    layerKey,
    fieldKey,
    resultManager
  );
  const isVariable = isVariableLink(layerValue);
  const [variableValue] = useLayerValue(
    isVariable ? layerValue : null,
    "defaultValue",
    resultManager
  );
  const [instanceValue] = useInstancePropertyValue(
    instanceLayerKey && isVariable ? instanceManager : null,
    instanceLayerKey,
    layerValue
  );

  const info = useMemo(
    () => ({
      ...layerInfo,
      isVariable,
      rawValue: layerValue,
    }),
    [layerInfo, isVariable]
  );

  return [
    isVariable ? instanceValue ?? variableValue : layerValue,
    updateValue,
    info,
  ];
};
