import { GraphState, keyOfEntity, LinkKey } from "@graph-state/core";
import { getAllParents } from "@/shared/helpers";

export const useLayerScopes = (
  fragmentManager: GraphState,
  layerKey: LinkKey
) => {
  const layerParents = getAllParents(fragmentManager, layerKey);
  const resultScopes = [];

  layerParents.forEach((parent) => {
    const parentLink = keyOfEntity(parent);

    if (fragmentManager?.$scopes?.scopes?.has(parentLink)) {
      resultScopes.push(fragmentManager?.$scopes?.scopes?.get(parentLink));
    }
  });

  return resultScopes;
};
