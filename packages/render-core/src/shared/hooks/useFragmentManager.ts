import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { GraphState } from "@graph-state/core";

export const useFragmentManager = (
  fragmentId: string | number,
  globalContext?: GraphState
) => {
  const { globalManagerGraph, getFragmentManager } =
    useGlobalManager(globalContext);
  if (!globalManagerGraph) {
    throw new Error(
      "Need declare global context. Use <FragmentsGlobalContext> and createGlobalContext."
    );
  }

  return getFragmentManager(fragmentId);
};
