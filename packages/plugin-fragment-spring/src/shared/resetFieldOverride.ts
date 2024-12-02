import { GraphState } from "@graph-state/core";

export const resetFieldOverride = (node, field: string, cache: GraphState) => {
  if (cache.resolve(node) && field) {
    cache.mutate(cache.keyOfEntity(node), {
      [field]: null,
    });
  }
};
