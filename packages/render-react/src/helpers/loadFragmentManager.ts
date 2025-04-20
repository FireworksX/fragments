import { GraphState } from "@graph-state/core";

export const loadFragmentManager = async (
  globalManager: GraphState,
  fragmentId: number
) => {
  const { document, linkedFragments } = await globalManager?.queryFragment?.(
    fragmentId
  );

  if (fragmentId && document) {
    if (linkedFragments) {
      linkedFragments.forEach(({ id, document }) => {
        globalManager?.createFragmentManager(id, document);
      });
    }

    return globalManager?.createFragmentManager(fragmentId, document);
  }

  return null;
};
