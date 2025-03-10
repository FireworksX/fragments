import { useGlobalContext } from "@/shared/hooks/useGlobalContext";
import { GraphState } from "@graph-state/core";

export const useFragmentManager = (
  fragmentId: string | number,
  context?: GraphState
) => {
  const { contextGraph, getFragmentManager } = useGlobalContext(context);
  if (!contextGraph) {
    throw new Error(
      "Need declare global context. Use <FragmentsGlobalContext> and createGlobalContext."
    );
  }

  return getFragmentManager(fragmentId);
};
