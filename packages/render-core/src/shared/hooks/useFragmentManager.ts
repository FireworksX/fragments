import { useEffect, useState } from "preact/compat";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useFragmentManager = (
  fragmentId?: unknown,
  inputGlobalManager
) => {
  const { globalManagerGraph, manager: globalManager } =
    useGlobalManager(inputGlobalManager);
  const [loading, setLoading] = useState(false);

  const getFragmentManager = (id: string) => {
    return globalManagerGraph?.fragmentsManagers?.[id];
  };

  const loadFragmentManager = async (id: string) => {
    if (id) {
      const queryResult = await globalManager.queryFragment(id);
      const { document, linkedFragments } = queryResult;

      if (queryResult) {
        if (linkedFragments) {
          linkedFragments.forEach(({ id, document }) => {
            globalManager?.createFragmentManager(id, document);
          });
        }
      }

      return globalManager?.createFragmentManager(id, document);
    }
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
