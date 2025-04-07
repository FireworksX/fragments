import { useEffect, useState } from "react";
import { useGlobalManager } from "@/hooks/useGlobalManager";
import { useGraph } from "@graph-state/react";

export const useFragmentManager = (fragmentId: unknown) => {
  const { globalManagerGraph, manager: globalManager } = useGlobalManager();
  const [loading, setLoading] = useState(false);

  const getFragmentManager = (id: string) => {
    return globalManagerGraph?.fragmentsManagers?.[id];
  };

  const loadFragmentManager = async (id: string) => {
    setLoading(true);
    const fragmentDocument =
      await globalManagerGraph.fetchManager.queryFragment(id);
    const res = globalManager?.createFragmentManager(id, fragmentDocument);
    setLoading(false);
    return res;
  };

  useEffect(() => {
    if (globalManagerGraph) {
      loadFragmentManager(fragmentId);
    }
  }, [fragmentId, globalManagerGraph]);

  return {
    loading,
    manager: getFragmentManager(fragmentId),
  };
};
