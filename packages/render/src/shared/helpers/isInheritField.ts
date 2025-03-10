import { Entity, GraphState } from "@graph-state/core";
import { getOverrider } from "@/shared/helpers/getOverrider.ts";
import { isValue } from "@fragments/utils";

export const isInheritField = (
  manager: GraphState,
  layerEntity: Entity,
  field: string
) => {
  const layer = manager.resolve(layerEntity);

  if (layer) {
    const overrider = getOverrider(manager, layer);
    // Значит это primary слой, а у него поля не могут перезаписываться
    if (overrider?._id === layer?._id) return false;

    return !!overrider && !isValue(layer?.[field]);
  }

  return false;
};
