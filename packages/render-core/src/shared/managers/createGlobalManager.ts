import { createState, LinkKey } from "@graph-state/core";
import { nodes, renderTarget } from "@/definitions";
import { createManager } from "@/shared/managers/createManager";
import { createFetchManager } from "@/shared/managers/fetchManager/createFetchManager";

interface Options {
  apiToken: string;
  isSelf?: boolean;
}

export const createGlobalManager = ({ apiToken, isSelf }: Options = {}) =>
  createState({
    _type: "GlobalManager",
    initialState: {
      fetchManager: createFetchManager(apiToken, isSelf),
      fragmentsManagers: {},
      renderTarget: renderTarget.document,
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

        state.setRenderTarget = (value) => {
          state.mutate(state.key, {
            renderTarget: value,
          });
        };
      },
    ],
  });

export let GLOBAL_MANAGER = createGlobalManager();

export const getGlobalManager = () => GLOBAL_MANAGER;
