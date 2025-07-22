import { GraphState } from "@graph-state/core";

export const loadFragmentManager = async (
  globalManager: GraphState,
  fragmentId: number
) => {
  const { document, linkedFragments } =
    await globalManager?.$fetch?.queryFragment?.(fragmentId);

  if (fragmentId && document) {
    if (linkedFragments) {
      linkedFragments.forEach(({ id, document }) => {
        globalManager?.$fragments.createFragmentManager(id, document);
      });
    }

    return globalManager?.$fragments.createFragmentManager(
      fragmentId,
      document
    );
  }

  return null;
};
