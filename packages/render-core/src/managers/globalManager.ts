import { createState, GraphState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { plugin as fetchPlugin } from "@/managers/fetchPlugin/plugin";
import { createFragmentManager } from "@/managers/fragmentManager";
import { styleSheetPlugin } from "@/managers/styleSheetPlugin";

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

      const manager = createFragmentManager(state)(fragmentId, document);

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

    state.extractStyleTags = async () => {
      const allFragments = state.resolve(state.key).fragmentsManagers;
      const extractors = Object.entries(allFragments)
        .filter(([, value]) => !!value?.resolve)
        .map(([, manager]) => manager.extractStyleTags());

      const extractedStyles = await Promise.all(extractors);

      return Object.values(
        extractedStyles.reduce((acc, extrected) => {
          Object.entries(extrected).forEach(([key, styleTag]) => {
            acc[key] = styleTag;
          });

          return acc;
        }, {})
      );
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
