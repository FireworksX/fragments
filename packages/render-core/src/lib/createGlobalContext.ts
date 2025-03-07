import { createState, LinkKey } from "@graph-state/core";
import { createManager } from "@/lib/createManager.ts";
import { nodes } from "@fragments/plugin-fragment";

export const createGlobalContext = () => {
  const globalContext = createState({
    _type: "GlobalContext",
    initialState: {
      fragmentsManagers: {},
    },
  });

  const createFragmentManager = (fragmentId: string, document: unknown) => {
    const currentManager = globalContext.resolve(globalContext.key)
      ?.fragmentsManagers?.[fragmentId];
    if (currentManager) {
      return currentManager;
    }

    const manager = createManager(`${nodes.Fragment}:${fragmentId}`, document);

    globalContext.mutate(globalContext.key, {
      fragmentsManagers: {
        [fragmentId]: manager,
      },
    });

    return manager;
  };

  return {
    globalContext,
    createFragmentManager,
  };
};
