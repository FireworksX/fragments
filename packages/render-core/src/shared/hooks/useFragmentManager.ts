import { useEffect, useState } from "preact/compat";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useFragmentManager = (fragmentId?: unknown) => {
  const { globalManagerGraph, manager: globalManager } = useGlobalManager();
  const [loading, setLoading] = useState(false);

  const getFragmentManager = (id: string) => {
    return globalManagerGraph?.fragmentsManagers?.[id];
  };

  const loadFragmentManager = async (id: string) => {
    const fragmentDocument =
      await globalManagerGraph.fetchManager.queryFragment(id);

    return globalManager?.createFragmentManager(id, fragmentDocument);
  };

  useEffect(() => {
    (async () => {
      if (globalManagerGraph && !getFragmentManager(fragmentId)) {
        setLoading(true);
        await loadFragmentManager(fragmentId);
        setLoading(false);
      }
    })();
  }, [fragmentId, globalManagerGraph]);

  return {
    loading,
    manager: getFragmentManager(fragmentId),
    loadFragmentManager,
  };
};
