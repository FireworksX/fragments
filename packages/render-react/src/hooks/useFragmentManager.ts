import { useGlobalManager } from "@/hooks/useGlobalManager";
import { useEffect, useState } from "react";
import { useGraph } from "@graph-state/react";

export const useFragmentManager = (fragmentId: unknown) => {
  const globalManager = useGlobalManager();
  const [globalGraph] = useGraph(globalManager, globalManager?.key);
  const [loading, setLoading] = useState(false);

  const getFragmentManager = (id: string) => {
    return globalGraph?.fragmentsManagers?.[id];
  };

  const loadFragmentManager = async (id: string) => {
    setLoading(true);
    const fragmentDocument = await globalGraph.fetchManager.queryFragment(id);
    const res = globalManager?.createFragmentManager(id, fragmentDocument);
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
