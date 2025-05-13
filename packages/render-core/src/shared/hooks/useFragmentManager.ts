import { useEffect, useState } from "preact/compat";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useFragmentManager = (
  fragmentId?: unknown,
  inputGlobalManager
) => {
  const {
    fragmentsGraph,
    manager: globalManager,
    getFragmentManager,
    queryFragmentManager,
  } = useGlobalManager(inputGlobalManager);
  const [loading, setLoading] = useState(false);

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
      if (fragmentsGraph && !getFragmentManager(fragmentId)) {
        setLoading(true);
        await queryFragmentManager(fragmentId);
        setLoading(false);
      }
    })();
  }, [fragmentId, fragmentsGraph]);

  return {
    loading,
    manager: getFragmentManager(fragmentId),
    queryFragmentManager,
    // loadFragmentManager,
  };
};
