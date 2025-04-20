import { useEffect, useState } from "preact/compat";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { isObject } from "@fragmentsx/utils";

export const useFragmentManager = (fragmentId?: unknown) => {
  const { globalManagerGraph, manager: globalManager } = useGlobalManager();
  const [loading, setLoading] = useState(false);

  const getFragmentManager = (id: string) => {
    return globalManagerGraph?.fragmentsManagers?.[id];
  };

  const loadFragmentManager = async (id: string) => {
    const { document, linkedFragments } = await globalManager.queryFragment(id);

    if (linkedFragments) {
      linkedFragments.forEach(({ id, document }) => {
        globalManager?.createFragmentManager(id, document);
      });
    }

    return globalManager?.createFragmentManager(id, document);
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
