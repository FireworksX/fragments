import { GraphState } from "@graph-state/core";
import { createLayer } from "@/shared/helpers/createLayer.ts";

export const declareFragmentProperty = (
  manager: GraphState,
  property: { type: string },
  fragmentLink = manager.$fragment.root
) => {
  const propertyLayer = createLayer(property);

  if (propertyLayer && "type" in propertyLayer) {
    manager.mutate(manager.keyOfEntity(fragmentLink), {
      properties: [propertyLayer],
    });

    return manager.keyOfEntity(propertyLayer);
  }

  return null;
};
