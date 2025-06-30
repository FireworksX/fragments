import { createState, Plugin } from "@graph-state/core";
import {
  isGraph,
  isHtmlContent,
  isHTMLNode,
  isLinkKey,
  allowTypes,
} from "@graph-state/checkers";
import { definition } from "@fragmentsx/definition";
import { isBrowser, isKey } from "@fragmentsx/utils";
import { fragmentStylesheetPlugin } from "@/plugins/styleSheet";
import { autoInjector } from "@/plugins/styleSheet/utils/autoInjector";
import { PLUGIN_TYPES } from "@/fragmentsClient";

export const fragmentsPlugin: Plugin = (state) => {
  const createFragmentManager = (fragmentId: number, initialDocument = {}) => {
    if (!fragmentId || !initialDocument) return null;

    const cacheManager = state.resolve(state.$fragments.key)?.managers?.[
      fragmentId
    ];

    if (cacheManager) {
      return cacheManager;
    }

    const tempGraph = {
      _type: "Temp",
      _id: "root",
    };

    const springGraph = {
      _type: "Spring",
      _id: "root",
    };

    const manager = createState({
      _type: "FragmentManager",
      _id: fragmentId,
      initialState: initialDocument,
      plugins: [
        (state) => {
          state.$fragment = {
            root: `${definition.nodes.Fragment}:${fragmentId}`,
            temp: "Temp:root",
          };
        },
        // cssPlugin,
        fragmentStylesheetPlugin,
      ],
      skip: [
        isHtmlContent,
        isHTMLNode,
        isKey,
        allowTypes([
          ...Object.keys(definition.nodes),
          "Temp",
          "Spring",
          PLUGIN_TYPES.FragmentStylesheet,
        ]),
      ],
    });

    manager.mutate(tempGraph);
    manager.mutate(springGraph);

    state.mutate(state.$fragments.key, {
      managers: {
        [fragmentId]: manager,
      },
    });
  };

  const getManager = (fragmentId) => {
    return state.resolve(state.$fragments.key)?.managers?.[fragmentId];
  };

  const getManagers = () => {
    return state.resolve(state.$fragments.key)?.managers;
  };

  state.$fragments = {
    key: `${PLUGIN_TYPES.FragmentsPlugin}:root`,
    createFragmentManager,
    getManager,
    getManagers,
  };

  state.mutate({
    _type: PLUGIN_TYPES.FragmentsPlugin,
    _id: "root",
    managers: {},
  });

  return state;
};
