import { useContext, useEffect } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerValue } from "@/shared/hooks/useLayerValue.ts";
import { isVariableLink } from "@/lib/zod.ts";
import { GraphState, LinkKey } from "@graph-state/core";

export const useLayerVariableValue = (
  layerKey: LinkKey,
  fieldKey: string,
  manager?: GraphState
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = manager ?? fragmentManager;
  const [layerValue, updateValue, info] = useLayerValue(
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

  return [
    isVariable ? variableValue : layerValue,
    updateValue,
    {
      ...info,
      isVariable,
      rawValue: layerValue,
    },
  ];
};
