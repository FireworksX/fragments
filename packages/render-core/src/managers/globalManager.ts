import { createState, GraphState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { plugin as fetchPlugin } from "@/managers/fetchPlugin/plugin";
import { createFragmentManager } from "@/managers/fragmentManager";

interface Options {
  apiToken: string;
  isSelfHosted?: boolean;
}

export const createGlobalManager = ({ apiToken, isSelfHosted }: Options) => {
  const plugin = (state: GraphState) => {
    state.createFragmentManager = (fragmentId: string, document: unknown) => {
      if (!fragmentId || !document) return null;

      const currentManager = state.resolve(state.key)?.fragmentsManagers?.[
        fragmentId
      ];

      if (currentManager) {
        return currentManager;
      }

      const manager = createFragmentManager(fragmentId, document);

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

    state.extractStyleTags = () => {
      const allFragments = state.resolve(state.key).fragmentsManagers;

      return Object.entries(allFragments)
        .filter(([, value]) => !!value?.resolve)
        .map(([, manager]) => manager.generateCss());
    };
  };

  return createState({
    _type: "GlobalManager",
    initialState: {
      fragmentsManagers: {},
      renderTarget: definition.renderTarget.document,
    },
    plugins: [plugin, fetchPlugin(apiToken, isSelfHosted)],
  });
};
