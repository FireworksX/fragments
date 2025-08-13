import { useEffect, useState } from "preact/compat";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useFragmentManager = (
  fragmentId?: unknown | null,
  inputGlobalManager,
  aa
) => {
  const {
    fragmentsGraph,
    manager: gg,
    getFragmentManager,
    queryFragmentManager,
  } = useGlobalManager(inputGlobalManager);
  const [loading, setLoading] = useState(false);

  const manager = getFragmentManager(fragmentId);

  // const loadFragmentManager = async (id: string) => {
  //   if (id) {
  //     const queryResult = await queryFragmentManager(id);
  //     const { document, linkedFragments } = queryResult;
  //
  //     if (queryResult) {
  //       if (linkedFragments) {
  //         linkedFragments.forEach(({ id, document }) => {
  //           globalManager?.createFragmentManager(id, document);
  //         });
  //       }
  //     }
  //
  //     return globalManager?.createFragmentManager(id, document);
  //   }
  // };

  useEffect(() => {
    (async () => {
      if (fragmentsGraph && !getFragmentManager(fragmentId) && !!fragmentId) {
        setLoading(true);
        await queryFragmentManager(fragmentId);
        setLoading(false);
      }
    })();
  }, [fragmentId, fragmentsGraph]);

  return {
    loading,
    manager,
    fragmentLayerKey: manager?.$fragment?.root,
    queryFragmentManager,
    // loadFragmentManager,
  };
};
