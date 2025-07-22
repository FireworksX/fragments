import { useContext } from "preact/compat";
import { useGraph } from "@graph-state/react";
import { GraphState } from "@graph-state/core";
import { GlobalManager } from "@/providers/GlobalManager";
import { noop } from "@fragmentsx/utils";

export const useGlobalManager = (globalManager?: GraphState) => {
  const currentGlobalManager = useContext(GlobalManager);
  const resultManager = globalManager ?? currentGlobalManager;
  const [fragmentsGraph] = useGraph(
    resultManager,
    resultManager?.$fragments?.key
  );

  const queryFragmentManager = (id: string) =>
    resultManager?.$load?.loadFragment?.(id);

  const queryArea = (id: string) => resultManager?.$load?.loadArea?.(id);

  const setRenderTarget = (value) => {
    resultManager?.setRenderTarget(value);
  };

  return {
    fragmentsGraph,
    manager: resultManager,
    queryFragmentManager,
    queryArea,
    getFragmentManager: resultManager?.$fragments?.getManager ?? noop,
    setRenderTarget,
  };
};
