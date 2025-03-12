import { useGraph } from "@graph-state/react";
import { GraphState } from "@graph-state/core";
import { useContext } from "preact/compat";
import { GlobalManager } from "@/components/GlobalManager";

export const useGlobalManager = (globalContext?: GraphState) => {
  const currentGlobalManager = useContext(GlobalManager);
  const resultManager = globalContext ?? currentGlobalManager;
  const [globalManagerGraph] = useGraph(resultManager, resultManager?.key);

  const getFragmentManager = (id: string) =>
    globalManagerGraph?.fragmentsManagers?.[id];

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
