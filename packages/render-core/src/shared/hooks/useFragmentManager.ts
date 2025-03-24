import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { GraphState } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { useEffect, useState } from "preact/compat";

export const useFragmentManager = (
  fragmentId: string | number,
  globalContext?: GraphState
) => {
  const { globalManagerGraph, manager } = useGlobalManager(globalContext);
  if (!globalManagerGraph) {
    throw new Error("Need declare global context");
  }

  const [loading, setLoading] = useState(false);

  const getFragmentManager = (id: string) => {
    return globalManagerGraph?.fragmentsManagers?.[id];
  };

  const loadFragmentManager = async (id: string) => {
    setLoading(true);

    const fragmentDocument =
      await globalManagerGraph.fetchManager.queryFragment(id);
    const res = manager?.createFragmentManager(id, fragmentDocument);

    setLoading(false);
    return res;
  };

  useEffect(() => {
    loadFragmentManager(fragmentId);
  }, [fragmentId]);

  return {
    loading,
    manager: getFragmentManager(fragmentId),
  };
};
