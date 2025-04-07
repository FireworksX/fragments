import { useContext } from "react";
import { useGraph } from "@graph-state/react";
import { GraphState } from "@graph-state/core";
import { GlobalManager } from "@/providers/GlobalManager";

export const useGlobalManager = (globalManager?: GraphState) => {
  const currentGlobalManager = useContext(GlobalManager);
  const resultManager = globalManager ?? currentGlobalManager;
  const [globalManagerGraph] = useGraph(resultManager, resultManager?.key);

  const getFragmentManager = async (id: string) => {
    const fragmentDocument =
      await globalManagerGraph.fetchManager.queryFragment(id);
    return resultManager.createFragmentManager(id, fragmentDocument);
  };

  const setRenderTarget = (value) => {
    resultManager?.setRenderTarget(value);
  };

  return {
    globalManagerGraph,
    manager: resultManager,
    getFragmentManager,
    setRenderTarget,
  };
};
