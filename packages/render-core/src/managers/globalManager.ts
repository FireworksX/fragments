import { createState, GraphState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";

import { createFetchManager } from "./fetchManager/createFetchManager";
import { createFragmentManager } from "@/managers/fragmentManager";

interface Options {
  apiToken: string;
  isSelfHosted?: boolean;
}

export const createGlobalManager = ({ apiToken, isSelfHosted }: Options) => {
  const fetchManager = createFetchManager(apiToken, isSelfHosted);

  const plugin = (state: GraphState) => {
    state.createFragmentManager = (fragmentId: string, document: unknown) => {
      const currentManager = state.resolve(state.key)?.fragmentsManagers?.[
        fragmentId
      ];

      if (currentManager) {
        return currentManager;
      }

      const manager = createFragmentManager(
        `${definition.nodes.Fragment}:${fragmentId}`,
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
  };

  return createState({
    _type: "GlobalManager",
    initialState: {
      fetchManager,
      fragmentsManagers: {},
      renderTarget: definition.renderTarget.document,
    },
    plugins: [plugin],
  });
};
