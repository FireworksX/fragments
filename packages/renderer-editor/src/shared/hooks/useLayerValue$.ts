import { useCallback, useContext, useEffect, useMemo } from "react";
import { GraphState, LinkKey } from "@graph-state/core";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";

export const useLayerValue$ = (
  layerKey: LinkKey,
  fieldKey: string,
  manager?: GraphState
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const resultManager = manager ?? fragmentManager;

  return [
    null,
    (value) =>
      resultManager.mutate("Spring:root", {
        [fieldKey]: value,
      }),
  ];
};
