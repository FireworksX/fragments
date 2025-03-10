import { useGraph } from "@graph-state/react";
import { getFragmentsGlobalContext } from "@/lib/createGlobalContext";
import { GraphState } from "@graph-state/core";

export const useGlobalContext = (context?: GraphState) => {
  const resultContext = context ?? getFragmentsGlobalContext();
  const [contextGraph] = useGraph(resultContext, resultContext?.key);

  const getFragmentManager = (id: string) =>
    contextGraph?.fragmentsManagers?.[id];

  return {
    contextGraph,
    context: resultContext,
    getFragmentManager,
  };
};
