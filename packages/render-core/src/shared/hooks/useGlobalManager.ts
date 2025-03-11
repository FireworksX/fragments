import { useGraph } from "@graph-state/react";
import { GraphState } from "@graph-state/core";
import { getGlobalManager } from "@/shared/managers/createGlobalManager";

export const useGlobalManager = (globalContext?: GraphState) => {
  const resultContext = globalContext ?? getGlobalManager();
  const [globalManagerGraph] = useGraph(resultContext, resultContext?.key);

  const getFragmentManager = (id: string) =>
    globalManagerGraph?.fragmentsManagers?.[id];

  const setRenderTarget = (value) => {
    resultContext?.setRenderTarget(value);
  };

  return {
    globalManagerGraph,
    context: resultContext,
    getFragmentManager,
    setRenderTarget,
  };
};
