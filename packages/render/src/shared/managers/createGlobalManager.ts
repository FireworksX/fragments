import { createState, LinkKey } from "@graph-state/core";
import { createManager } from "@/lib/createManager";
import { nodes } from "@/definitions";

export const createGlobalManager = () =>
  createState({
    _type: "GlobalManager",
    initialState: {
      fragmentsManagers: {},
    },
    plugins: [
      (state) => {
        state.createFragmentManager = (
          fragmentId: string,
          document: unknown
        ) => {
          const currentManager = state.resolve(state.key)?.fragmentsManagers?.[
            fragmentId
          ];
          if (currentManager) {
            return currentManager;
          }

          const manager = createManager(
            `${nodes.Fragment}:${fragmentId}`,
            document
          );

          state.mutate(state.key, {
            fragmentsManagers: {
              [fragmentId]: manager,
            },
          });

          return manager;
        };
      },
    ],
  });

export let GLOBAL_MANAGER = createGlobalManager();

export const getGlobalManager = () => GLOBAL_MANAGER;
