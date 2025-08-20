import { GraphState, LinkKey } from "@graph-state/core";
import { getParent } from "@/shared/helpers/getParent.ts";
import { isBrowser } from "@fragmentsx/utils";

export const getAllParents = (
  manager: GraphState,
  layerKey: LinkKey,
  stack: unknown[] = []
) => {
  const parent = getParent(manager, layerKey);

  if (parent) {
    stack.push(parent);
    getAllParents(manager, manager.keyOfEntity(parent), stack);
  }

  return stack;
};
