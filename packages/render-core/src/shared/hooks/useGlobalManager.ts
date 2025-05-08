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

  const queryFragmentManager = async (id: string) => {
    const queryResult = await resultManager?.$fetch?.queryFragment(id);
    const { document, linkedFragments } = queryResult ?? {};

    if (linkedFragments) {
      linkedFragments.forEach(({ id, document }) => {
        resultManager.$fragments.createFragmentManager(id, document);
      });
    }

    return resultManager.$fragments.createFragmentManager(id, document);
  };

  const setRenderTarget = (value) => {
    resultManager?.setRenderTarget(value);
  };

  return {
    fragmentsGraph,
    manager: resultManager,
    queryFragmentManager,
    getFragmentManager: resultManager?.$fragments?.getManager ?? noop,
    setRenderTarget,
  };
};
